import { Context, SScalar } from 'constructs';
import { SourceFile } from '../SourceFile';
import { Literal, readLiteral } from './readLiteral';
const SScalarLiteral: Literal = {
  name: 'sscalar',
  properties: [
    { name: 'regex', type: 'regex', optional: true },
    { name: 'min', type: 'number', optional: true },
    { name: 'max', type: 'number', optional: true },
  ],
};

export function readSScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('nscalar')) return;
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
  description: string | undefined
) {
  return new SScalar({
    ...readLiteral(SScalarLiteral, source),
    context,
    name,
    description,
  });
}
