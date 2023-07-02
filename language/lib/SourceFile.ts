import { readFile } from 'fs/promises';
import { SourceFileError } from './SourceFileError';

const Whitespace = /\s+/y;
const NewLine = /\n/g;
const NotWhitespace = /\S+/y;
const Float = /\d+(\.\d*)?/y;
const Int = /\d+/y;
const DescriptionRegex = /```(.(.(?<!```)|\n)*)```/sy;
const NameRegex = /[a-zA-Z][\w\d]*/y;
const NameWithDotRegex = /[a-zA-Z][\w\d\.]*/y;

export class SourceFile {
  path: string;
  index = 0;
  line = 1;
  col = 1;
  errors: SourceFileError[] = [];
  input!: string;

  private _word: string | null = null;
  pendingDescription?: string;
  get word() {
    if (!this._word) {
      NotWhitespace.lastIndex = this.index;
      const result = NotWhitespace.exec(this.input);
      this._word = result ? result[0] : null;
    }
    return this._word!;
  }

  constructor(path: string) {
    this.path = path;
  }

  async read() {
    this.input = await readFile(this.path, { encoding: 'utf8' });
  }

  move(count: number) {
    this._word = null;
    NewLine.lastIndex = this.index;
    this.index += count;
    this.col += count;
    let match;
    while ((match = NewLine.exec(this.input))) {
      if (match.index < this.index) {
        this.line += 1;
        this.col = this.index - match.index;
      } else break;
    }
  }

  consume(pattern: RegExp, toNext = true): RegExpExecArray | null {
    const result = this.exec(pattern);
    if (result) {
      this.move(result[0].length);
    }
    if (toNext) this.toNextReal();
    return result;
  }

  consumeHash<T>(hash: { [key: string]: T }): T | void {
    const res = hash[this.word];
    if (res !== undefined) {
      this.consumeWord();
      return res;
    }
  }

  consumeWord(word?: string) {
    if (word && this.word !== word) return false;
    if (this.word) {
      this.move(this.word.length);
      this.toNextReal();
      return true;
    }
    return false;
  }

  exec(pattern: RegExp) {
    if (!pattern.flags.includes('y')) throw new Error('Regex must be sticky');
    pattern.lastIndex = this.index;
    return pattern.exec(this.input);
  }

  char() {
    return this.input[this.index];
  }

  startsWith(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (this.input[this.index + i] !== str[i]) return false;
    }
    return true;
  }

  toNextReal() {
    this.consume(Whitespace, false);
    if (this.consumeWord('//')) {
      this.consume(/[^\n]*/y, false);
      this.toNextReal();
    }
    return this.index < this.input.length;
  }

  addError(message: string) {
    this.errors.push(new SourceFileError(this, message));
    return undefined;
  }

  get location() {
    return { index: this.index, col: this.col, line: this.line };
  }

  get locationString() {
    return `Line: ${this.line} Column: ${this.col} Index: ${this.index}`;
  }

  get firstChar() {
    return this.input[this.index];
  }

  consumeChar(char?: string) {
    if (char && this.firstChar !== char) return false;
    this.move(1);
    this.toNextReal();
    return true;
  }

  openClosure() {
    return this.consumeChar('{');
  }

  closeClosure() {
    return this.consumeChar('}');
  }

  openParens() {
    return this.consumeChar('(');
  }

  closeParens() {
    return this.consumeChar(')');
  }

  consumeBoolean() {
    if (this.consumeWord('true')) return true;
    if (this.consumeWord('false')) return false;
    return undefined;
  }

  consumeFloat() {
    let match = this.consume(Float);
    if (match) {
      return parseFloat(match[0]);
    }
    return undefined;
  }

  consumeInt() {
    let match = this.consume(Int);
    if (match) {
      return parseInt(match[0]);
    }
    return undefined;
  }

  description(): string | undefined {
    if (this.pendingDescription) return this.pendingDescription;
    const result = this.consume(DescriptionRegex);
    this.pendingDescription = result ? result[1].trim() : undefined;
    return this.pendingDescription;
  }
  consumeDescription() {
    this.pendingDescription = undefined;
  }

  name() {
    let res = this.consume(NameRegex);
    return res ? res[0] : undefined;
  }

  qualifiedName() {
    let res = this.consume(NameWithDotRegex);
    return res ? res[0] : undefined;
  }
}
