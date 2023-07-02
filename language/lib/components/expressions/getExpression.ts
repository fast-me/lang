import { Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { assignments } from './assignments';
import { binary, compound } from './compound';
import { getSingularExpression } from './getSingularExpression';

export function getExpression(source: SourceFile): Expression | undefined {
  const expr = getSingularExpression(source);
  if (!expr) return;

  let result: Expression | undefined = undefined;

  // && ||
  result = compound(source, expr);
  if (result) return result;

  // & |
  result = binary(source, expr);
  if (result) return result;

  // = += -= *= /=
  result = assignments(source, expr);
  if (result) return result;

  return expr;
}
