import { Context, NScalar } from 'constructs';
import { SourceFile } from '../SourceFile';
import { Literal, readLiteral } from './readLiteral';

const NScalarLiteral: Literal = {
  name: 'nscalar',
  properties: [
    { name: 'min', type: 'number', optional: true },
    { name: 'max', type: 'number', optional: true },
    { name: 'decimals', type: 'number', optional: true },
  ],
};

export function readNScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('nscalar')) return;
  const name = source.name();
  if (!name) {
    return source.addError('expected name for nscalar');
  }
  source.consumeDescription();
  return readNScalarWithName(source, context, name, description);
}

export function readNScalarWithName(
  source: SourceFile,
  context: Context,
  name: string,
  description?: string
) {
  return new NScalar({
    ...readLiteral(NScalarLiteral, source),
    context,
    name,
    description,
  });
}
