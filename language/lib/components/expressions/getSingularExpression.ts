import { Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { grouping } from './grouping';
import { literalKeyword } from './literalKeyword';
import { not } from './not';
import { number } from './number';
import { string } from './string';
import { referenceOrInvocation } from './variableOrInvocation';

export function getSingularExpression(
  source: SourceFile
): Expression | undefined {
  return (
    not(source) ||
    literalKeyword(source) ||
    grouping(source) ||
    number(source) ||
    referenceOrInvocation(source) ||
    string(source)
  );
}
