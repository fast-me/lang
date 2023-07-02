import { Context } from 'constructs';
import { SourceFile } from '../SourceFile';
import { readVar } from './readVar';

export function readProperty(source: SourceFile, context: Context) {
  const description = source.description();
  const _var = readVar(source, context, undefined, description);
  if (!_var) return undefined;
  source.consumeDescription();
  return _var;
}
