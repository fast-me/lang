import { Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { getSingularExpression } from './getSingularExpression';

export function not(source: SourceFile): Expression | undefined {
  if (source.startsWith('!')) {
    source.move(1);
    const next = getSingularExpression(source);
    if (!next) return source.addError(`Expected operand for not operator (!)`);
    return {
      type: 'not',
      value: next,
    };
  }
  return undefined;
}
