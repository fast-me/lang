import { Type } from 'constructs';
import { SourceFile } from '../SourceFile';

export function readType(
  source: SourceFile,
  varName: string,
  optional?: boolean
) {
  if (!source.consumeChar(':'))
    return new Type({ optional, name: varName, raw: varName });
  const name = source.qualifiedName();

  if (!name) {
    source.addError('Expected name for delimited type');
    return new Type({ optional });
  }
  optional = optional || source.consumeChar('?');
  let t = new Type({ raw: name, optional, name });
  while (source.consumeWord('[]')) {
    t = t.many(source.consumeChar('?'));
  }
  return t;
}
