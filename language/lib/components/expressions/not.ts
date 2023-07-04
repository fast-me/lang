import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

export function not(
  source: SourceFile,
  context: Context
): Expression | undefined {
  if (source.startsWith('!')) {
    source.move(1);
    const next = getSingularExpression(source, context);
    if (!next) return source.addError(`Expected operand for not operator (!)`);
    return {
      type: 'not',
      value: next,
    };
  }
  return undefined;
}
