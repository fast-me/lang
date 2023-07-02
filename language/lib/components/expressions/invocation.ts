import { Reference, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';

const CommaRegex = /,/y;
export function invocation(
  source: SourceFile,
  variable: Reference
): Expression | undefined {
  if (!source.openParens()) return;
  const inputs: Expression[] = [];
  while (!source.closeParens()) {
    const expr = getExpression(source);
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
