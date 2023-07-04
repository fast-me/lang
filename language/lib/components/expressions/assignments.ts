import { Context, Expression, Math } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

const Assigns: { [key: string]: Math | null } = {
  '+=': Math.add,
  '-=': Math.subtract,
  '*=': Math.multiply,
  '/=': Math.divide,
  '=': null,
};

export function assignments(
  source: SourceFile,
  expr: Expression,
  context: Context
): Expression | undefined {
  const assign = source.consumeHash(Assigns);
  if (assign !== undefined) {
    let right = getSingularExpression(source, context);
    if (!right) {
      return source.addError(`Expected RHS for assignment ${assign}`);
    }
    if (assign) {
      right = { type: 'math', values: [expr, assign, right] };
    }
    const cont = assignments(source, right, context);
    if (cont) right = cont;
    return { type: 'assign', value: right, to: expr };
  }
  return undefined;
}
