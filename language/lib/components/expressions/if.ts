import { Expression } from 'constructs';
import { Context } from '../../../../constructs/lib/Context';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

const Elif = /elseif|elif|elsif|else if/y;

export function _if(
  source: SourceFile,
  context: Context,
  isQ?: Expression
): Expression | undefined {
  if (!isQ && !source.consumeWord('if')) return undefined;
  const _if: Expression = { type: 'if', branches: [] };
  let condition = isQ ?? getExpression(source, context);
  if (!condition) {
    source.addError('Expected valid expression for if condition');
    return undefined;
  }
  let branch: (typeof _if)['branches'][0] = { condition, statements: [] };
  _if.branches.push(branch);
  const isElif = isQ
    ? () => source.consumeWord('?:')
    : () => source.consume(Elif)?.[0];
  const isElse = isQ
    ? () => source.consumeWord(':')
    : () => source.consumeWord('else');
  const isEnd = isQ
    ? () => source.consumeWord('.')
    : () => source.consumeWord('endif');
  while (!isEnd()) {
    let expr = getExpression(source, context);
    if (expr) (_if.else ?? branch.statements).push(expr);
    if (isElif()) {
      condition = getExpression(source, context);
      if (!condition) {
        source.addError('Expected valid expression for else if condition');
        break;
      }
      branch = { condition, statements: [] };
      _if.branches.push(branch);
    } else if (isElse()) {
      _if.else = [];
    }
  }
  return _if;
}
