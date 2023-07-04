import { Reference, Expression, Context } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

const CommaRegex = /,/y;
export function invocation(
  source: SourceFile,
  variable: Reference,
  context: Context
): Expression | undefined {
  if (!source.openParens()) return;
  const inputs: Expression[] = [];
  while (!source.closeParens()) {
    const expr = getExpression(source, context);
    if (!expr) {
      return source.addError(
        `Expected a valid expression for ${variable.name} function parameter`
      );
    }
    inputs.push(expr);
    source.consume(CommaRegex);
  }
  return { type: 'invocation', fn: variable, inputs };
}
