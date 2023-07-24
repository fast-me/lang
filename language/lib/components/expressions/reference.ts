import { Reference } from 'constructs';
import { SourceFile } from '../../SourceFile';

export function reference(source: SourceFile): Reference | undefined {
  let name = source.qualifiedName();
  if (!name) return undefined;
  return {
    name,
  };
}
