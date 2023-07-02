import { Type } from 'constructs';
import { SourceFile } from '../SourceFile';

export function readType(
  source: SourceFile,
  varName: string,
  optional?: boolean
) {
  const name = source.qualifiedName();
  if (!name) {
    return new Type({ optional });
  }
  optional = optional || source.consumeChar('?');
  let t = new Type({ raw: name, optional, name });
  while (source.consumeWord('[]')) {
    t = t.many(source.consumeChar('?'));
  }
  return t;
}
