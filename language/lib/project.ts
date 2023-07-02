import { mkdir, readFile, readdir, stat } from 'fs/promises';
import path, { join } from 'path';
import { SourceFile } from './SourceFile';
import { Context } from 'constructs';
import { readSource } from './components/readSource';
import { writeFile, rm } from 'fs/promises';

const ignores = ['.ds_store', 'output'];
export class Project {
  dir: string;
  schemas: SourceFile[] = [];
  views: SourceFile[] = [];
  stringFiles: SourceFile[] = [];
  root = new Context({ name: 'root' });
  get errors() {
    return this.schemas.flatMap((it) => it.errors);
  }

  constructor(dir: string) {
    this.dir = dir;
  }

  async read() {
    await this.addDir(this.dir);
  }

  async addDir(dir: string) {
    const files = (await readdir(dir)).filter(
      (it) => !ignores.includes(it.toLowerCase())
    );
    for (const file of files) {
      const path = join(dir, file);
      const st = await stat(path);
      if (st.isDirectory()) {
        await this.addDir(path);
      } else {
        await this.addFile(path);
      }
    }
  }

  async addFile(file: string) {
    switch (path.extname(file)) {
      case '.fst':
      case '.ark':
        await this.addSchemaFile(file);
        break;
      case '.view':
        await this.addViewFile(file);
        break;
      case '.string':
        await this.addStringFile(file);
        break;
      default:
        throw new Error(`Unknown file type ${file}`);
    }
  }

  async addSchemaFile(path: string) {
    const _file = new SourceFile(path);
    await _file.read();
    this.schemas.push(_file);
  }

  async addViewFile(path: string) {
    const file = new SourceFile(path);
    await file.read();
    this.views.push(file);
  }

  async addStringFile(file: string) {
    const _file = new SourceFile(file);
    await _file.read();
    this.stringFiles.push(_file);
  }

  async parse() {
    for (const f of this.schemas) {
      await readSource(this.root, f);
    }
  }

  async outputFile(name: string, contents: string) {
    await mkdir(join(this.dir, 'output'), { recursive: true });
    await writeFile(join(this.dir, 'output', name), contents);
  }

  async outputConcepts() {
    await this.outputFile('concepts.json', stringify(this.root));
  }

  async outputErrors() {
    await this.outputFile('errors.json', stringify(this.errors));
  }

  async output() {
    try {
      await rm(join(this.dir, 'output'), { recursive: true });
    } catch (e) {}
    await this.outputConcepts();
    await this.outputErrors();
  }
}
