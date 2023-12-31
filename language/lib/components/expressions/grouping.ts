import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

export function grouping(
  source: SourceFile,
  context: Context
): Expression | undefined {
  if (source.openParens()) {
    const expr = getExpression(source, context);
    if (!expr) {
      return source.addError(`Expected valid expression after input open`);
    }
    if (!source.closeParens()) {
      return source.addError(`Expected close input ()) for open input.`);
    }
    return expr;
  }
  return undefined;
}
