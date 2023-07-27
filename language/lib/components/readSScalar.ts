import { Context, SScalar } from 'constructs';
import { SourceFile } from '../SourceFile';
import { readModelContents } from './readModel';
export function readSScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('sscalar')) return;
  const name = source.name();
  if (!name) {
    return source.addError(`expected name for sscalar ${name}`);
  }
  source.consumeDescription();
  return readSScalarWithName(source, context, name, description);
}

export function readSScalarWithName(
  source: SourceFile,
  context: Context,
  name: string,
  description?: string
) {
  return readModelContents(
    source,
    new SScalar({
      parent: context,
      name,
      description,
    })
  );
}
