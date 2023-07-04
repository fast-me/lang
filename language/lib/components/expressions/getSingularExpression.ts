import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { grouping } from './grouping';
import { literalKeyword } from './literalKeyword';
import { not } from './not';
import { number } from './number';
import { string } from './string';
import { referenceOrInvocation } from './variableOrInvocation';
import { _import } from './import';

export function getSingularExpression(
  source: SourceFile,
  context: Context
): Expression | undefined {
  return (
    not(source, context) ||
    literalKeyword(source, context) ||
    grouping(source, context) ||
    number(source, context) ||
    _import(source, context) ||
    referenceOrInvocation(source, context) ||
    string(source, context)
  );
}
