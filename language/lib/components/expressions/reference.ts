import { Reference } from 'constructs';
import { SourceFile } from '../../SourceFile';

export function reference(source: SourceFile): Reference | undefined {
  let names = source.qualifiedName()?.split('.');
  if (!names) return undefined;
  let name = names.first;
  let properties = names.slice(1);
  return {
    name,
    properties,
  };
}
