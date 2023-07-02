import { Context, SScalar } from 'constructs';
import { SourceFile } from '../SourceFile';

export function readSScalar(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('nscalar')) return;
  const name = source.name();
  if (!name) {
    return source.addError(`expected name for sscalar ${name}`);
  }
  if (!source.openClosure()) {
    source.addError(`expected open closure for sscalar ${name}`);
  }
  if (!source.consumeWord('regex')) {
    source.addError(`Expected regex for sscalar ${name}`);
    return;
  }
  let regex = source.word;
  source.consumeWord();
  if (!regex) {
    source.addError(`Expected regex for sscalar ${name}`);
    return;
  }
  if (!source.closeClosure()) {
    source.addError('Expcted closing closure for sscalar ${name}');
  }
  source.consumeDescription();
  return new SScalar({ context, name, description, regex });
}
