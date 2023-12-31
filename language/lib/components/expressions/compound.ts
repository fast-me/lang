import { Compound, Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

const Compounds = {
  '||': Compound.or,
  '&&': Compound.and,
};

const BinaryCompounds = {
  '|': Compound.or,
  '&': Compound.and,
};

export function binary(source: SourceFile, expr: Expression, context: Context) {
  return _compounds(source, expr, BinaryCompounds, 'binary_compound', context);
}
export function compound(
  source: SourceFile,
  expr: Expression,
  context: Context
) {
  return _compounds(source, expr, Compounds, 'compound', context);
}
export function _compounds(
  source: SourceFile,
  expr: Expression,
  tests: { [key: string]: Compound },
  as: 'compound' | 'binary_compound',
  context: Context
) {
  let compound = source.consumeHash(tests);
  if (compound) {
    let next = getSingularExpression(source, context);
    if (!next) {
      return source.addError(`Expected RHS of compound ${compound}`);
    }
    expr = { type: as, values: [expr!, compound, next] };
    while ((compound = source.consumeHash(tests))) {
      expr.values.push(compound);
      next = getSingularExpression(source, context);
      if (!next) source.addError(`Expected RHS of compound ${compound}`);
    }
    return expr;
  }
  return undefined;
}
