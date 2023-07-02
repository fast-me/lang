import { SourceFile } from '../SourceFile';

export type AtLeastOne<T> = T[] & { 0: T };

export function atLeastOne<R>(
  name: string,
  getter: (source: SourceFile) => R | undefined | void,
  source: SourceFile
): AtLeastOne<R> | undefined {
  let val = getter(source);
  if (!val) return source.addError(`Missing at least one ${name}`);
  const result: AtLeastOne<R> = [val];
  while ((val = getter(source))) result.push(val);
  return result;
}
