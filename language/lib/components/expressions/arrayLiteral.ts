import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

export function arrayLiteral(
  source: SourceFile,
  context: Context
): Expression | undefined {
  if (source.consumeChar('[')) {
    const ret: Expression = { type: 'array', entries: [] };
    while (!source.consumeChar(']')) {
      const expr = getExpression(source, context);
      if (expr) ret.entries.push(expr);
      source.consumeChar(',');
    }
    return ret;
  }
  return undefined;
}
