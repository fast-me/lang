import { Expression, Math } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

const Maths = {
  '+': Math.add,
  '-': Math.subtract,
  '*': Math.multiply,
  '/': Math.divide,
  '**': Math.power,
  '\\\\': Math.root,
};

export function maths(
  source: SourceFile,
  expr: Expression
): Expression | undefined {
  let math = source.consumeHash(Maths);
  if (math) {
    let next = getSingularExpression(source);
    if (!next) return source.addError(`Expected RHS for math ${math}`);
    const result: Expression = { type: 'math', values: [expr, math, next] };
    while ((math = source.consumeHash(Maths))) {
      result.values.push(math);
      next = getSingularExpression(source);
      if (!next) {
        source.addError(`Expected RHS for math operation ${math}`);
      } else {
        result.values.push(next);
      }
    }
    return next;
  }
  return undefined;
}
