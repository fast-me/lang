import { Context, Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { invocation } from './invocation';
import { reference } from './reference';
import { postfix } from './unaries';

export function referenceOrInvocation(
  source: SourceFile,
  context: Context
): Expression | undefined {
  const ref = reference(source);
  if (!ref) return source.addError(`Unresolved reference ${ref}`);
  return (
    invocation(source, ref, context) ||
    postfix(source, ref, context) || { type: 'reference', ref }
  );
}
