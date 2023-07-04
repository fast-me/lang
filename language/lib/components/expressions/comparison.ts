import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

export function comparison(
  source: SourceFile,
  expr: Expression,
  context: Context
): Expression | undefined {
  if (source.word === '==') {
    source.consumeWord();
    const right = getSingularExpression(source, context);
    if (!right) return source.addError('Expected RHS in compare');
    return { type: 'compare', left: expr, right };
  }
  return undefined;
}
