import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { readVar } from '../readVar';
import { string } from './string';
import { getSingularExpression } from './getSingularExpression';

export function objectLiteral(
  context: Context,
  source: SourceFile
): Expression | undefined {
  if (!source.consume(/o{/y)) return undefined;
  const properties: { name: string; value: Expression }[] = [];
  while (!source.closeClosure()) {
    let name = source.name();
    if (!name) {
      source.addError('Expected name for object literal property');
      continue;
    }
    let value: Expression | undefined = !source.consumeChar(':')
      ? { type: 'var', value: readVar(source, context, name)! }
      : getSingularExpression(source, context);
    if (!value) {
      source.addError('expected proper value for object lieral property');
      continue;
    }
    properties.push({ name, value });
  }
  return { type: 'object', properties };
}
