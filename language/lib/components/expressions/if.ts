import { Expression } from 'constructs';
import { Context } from '../../../../constructs/lib/Context';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

export function _if(
  source: SourceFile,
  context: Context,
  isQ?: Expression
): Expression | undefined {
  if (!isQ && !source.consumeWord('if')) return undefined;
  const _if: Expression = { type: 'if', branches: [] };
  const condition = isQ ?? getExpression(source, context);
  if (!condition) {
    source.addError('Expected valid expression for if condition');
    return undefined;
  }
  let branch: (typeof _if)['branches'][0] = { condition, statements: [] };
  _if.branches.push(branch);
  return _if;
}
