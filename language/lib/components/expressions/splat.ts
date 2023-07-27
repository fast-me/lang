import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';

export function splat(
  source: SourceFile,
  context: Context
): Expression | undefined {
  if (!source.consumeWord('...')) return undefined;
  const name = source.qualifiedName();
  if (!name)
    return source.addError('Expected qualified name for splat operator');
  return { type: 'splat', ref: { name } };
}
