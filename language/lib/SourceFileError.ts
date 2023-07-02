import { SourceFile } from './SourceFile';

export class SourceFileError extends Error {
  file: SourceFile;
  index: number;
  line: number;
  col: number;

  constructor(file: SourceFile, message: string) {
    super(message + ' ' + file.locationString);
    this.file = file;
    this.index = file.index;
    this.line = file.line;
    this.col = file.col;
  }

  toJSON() {
    return {
      file: this.file,
      message: this.message,
      line: this.line,
      col: this.col,
      index: this.index,
    };
  }
}
