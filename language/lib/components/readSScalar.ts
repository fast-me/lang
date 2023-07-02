import { Context, SScalar } from 'constructs';
import { SourceFile } from '../SourceFile';

export function readSScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('nscalar')) return;
  const name = source.name();
  if (!name) {
    return source.addError(`expected name for sscalar ${name}`);
  }
  const result: SScalar = { name } as any;
  if (!source.openClosure()) {
    source.addError(`expected open closure for sscalar ${name}`);
  }

  while (!source.closeClosure()) {
    if (source.consumeWord('regex')) {
      result.regex = source.consumeRegex();
      if (!result.regex) {
        source.addError(`expected regex for sscalar ${name}`);
      }
    }
  }
  return result;
}
