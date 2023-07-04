import { SourceFile } from '../SourceFile';
import { readModel } from './readModel';
import { readFunc } from './readFunc';
import { readSScalar } from './readSScalar';
import { readEnum } from './readEnum';
import { readNScalar } from './readNScalar';
import { Context } from 'constructs';
import { readVar } from './readVar';

export function readSource(root: Context, source: SourceFile) {
  while (true) {
    if (readFunc(source, root, true)) continue;
    if (readSScalar(source, root)) continue;
    if (readNScalar(source, root)) continue;
    if (readEnum(source, root)) continue;
    if (readModel(source, root)) continue;
    if (readVar(source, root)) continue;
    break;
  }
}
