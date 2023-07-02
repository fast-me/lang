import { Context, T } from 'constructs';
import { SourceFile } from '../SourceFile';
import { readVar } from './readVar';
import { readSScalar } from './readSScalar';

export function readProperty(source: SourceFile, context: Context) {
  const description = source.description();
  const _var = readVar(source, context, undefined, description);
  if (!_var) return undefined;
  source.consumeDescription();
  if (source.openClosure()) {
    switch (_var.type.t) {
      case T.str: {
        _var.type.t = T.sscalar;
        const s = readSScalar(source, context);
        _var.type.name = s.qualifiedName;
      }
    }
  }
  return _var;
}
