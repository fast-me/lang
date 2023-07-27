import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { assignments } from './assignments';
import { binary, compound } from './compound';
import { getSingularExpression } from './getSingularExpression';
import { _if } from './if';

export function getExpression(
  source: SourceFile,
  context: Context
): Expression | undefined {
  const __if = _if(source, context);
  if (__if) return __if;
  const expr = getSingularExpression(source, context);
  if (!expr) return;

  let result: Expression | undefined = undefined;

  // && ||
  result = compound(source, expr, context);

  // & |
  if (!result) result = binary(source, expr, context);

  // = += -= *= /=
  if (!result) result = assignments(source, expr, context);

  if (source.consumeWord('?')) result = _if(source, context, result ?? expr);

  return result ?? expr;
}
