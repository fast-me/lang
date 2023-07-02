import { Context, NScalar } from 'constructs';
import { SourceFile } from '../SourceFile';

export function readNScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('nscalar')) return;
  const name = source.name();
  if (!name) {
    return source.addError('expected name for nscalar');
  }
  let min: number | undefined = undefined;
  let max: number | undefined = undefined;
  let decimals: boolean | number | undefined = undefined;
  if (source.openClosure()) {
    while (!source.closeClosure()) {
      if (source.consumeWord('min')) {
        min = source.consumeFloat();
        if (min === undefined) {
          source.addError(`Expected number for minimium in nscalar ${name}`);
        }
      } else if (source.consumeWord('max')) {
        max = source.consumeFloat();
        if (min === undefined) {
          source.addError(`Expected number for maximum in nscalar ${name}`);
        }
      } else if (source.consumeWord('decimal')) {
        decimals = source.consumeBoolean() ?? source.consumeInt();
        if (decimals === undefined) {
          source.addError(
            `Expected boolean or integer for decimals of nscalar ${name}`
          );
        }
      }
    }
  }
  return new NScalar({ context, name, min, max, decimals, description });
}
