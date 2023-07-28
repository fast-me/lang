import { Context, T } from 'constructs';
import { SourceFile } from '../SourceFile';
import { readVar } from './readVar';
import { readSScalarWithName } from './readSScalar';
import { readNScalarWithName } from './readNScalar';

export function readProperty(
  source: SourceFile,
  context: Context,
  abstract: boolean = false
) {
  const description = source.description();
  const _var = readVar(source, context, undefined, description, abstract);
  if (!_var) return undefined;
  source.consumeDescription();
  if (source.isNextOpenClosure()) {
    switch (_var.type.t) {
      case T.str:
        {
          _var.type.t = T.sscalar;
          readSScalarWithName(source, context, _var.name, description);
          _var.type.name = _var.name;
        }
        break;
      case T.num: {
        _var.type.t = T.nscalar;
        readNScalarWithName(source, context, _var.name, description);
        _var.type.name = _var.name;
      }
    }
  }
  return _var;
}
