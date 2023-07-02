import type { SourceFile } from './SourceFile';

export interface TypeGetter<R> {
  name: string;
  get(source: SourceFile): R | undefined;
}
