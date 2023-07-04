import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';

export const NumberRegex = /(\d,)+(\.\d*)?(e\d+)?(?=\s)/y;

export function number(
  source: SourceFile,
  context: Context
): Expression | undefined {
  const match = source.consume(NumberRegex);
  if (match) return { type: 'number', value: match[0] };
  return undefined;
}
