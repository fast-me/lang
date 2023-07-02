import { Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { invocation } from './invocation';
import { reference } from './reference';
import { postfix } from './unaries';

export function referenceOrInvocation(
  source: SourceFile
): Expression | undefined {
  const ref = reference(source);
  if (!ref) return source.addError(`Unresolved reference ${ref}`);
  return (
    invocation(source, ref) ||
    postfix(source, ref) || { type: 'reference', ref }
  );
}
