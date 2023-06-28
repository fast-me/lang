import { readdir } from 'fs/promises';
import { join } from 'path';
import { LANG_EXTENSION } from './consants';

export class Project {
  dir: string;
  files: File[] = [];
  constructor(dir: string) {
    this.dir = dir;
  }

  async readFiles() {
    await this._readFiles('');
  }

  private async _readFiles(path: string) {
    const files = await readdir(join(this.dir, path), { withFileTypes: true });
    return await Promise.all(
      files.map(async (file) => {
        if (file.name.endsWith(`.${LANG_EXTENSION}`)) {
          const filePath = join(this.dir, path, file.name);
          console.log(filePath);
          const _file = new File(filePath);
          await _file.read();
          this.files.push(_file);
        } else {
          if (file.isDirectory()) {
            await this._readFiles(join(path, file.name));
          }
        }
      })
    );
  }

  get allContents() {
    return this.files.map((it) => it.contents).join('\n');
  }

  parse() {}
}

class File {
  path: string;
  contents: string = '';
  constructor(path: string) {
    this.path = path;
  }

  async read() {
    this.contents = await Bun.file(this.path).text();
  }
}
