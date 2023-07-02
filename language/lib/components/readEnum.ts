import { Context, Enum } from 'constructs';
import { SourceFile } from '../SourceFile';
import { atLeastOne } from '../utils/atLeastOne';
import { string } from './expressions/string';

function readEnumMember(source: SourceFile): {
  name: string;
  description?: string;
  value?: string;
} | void {
  const description = source.description();
  const name = source.name();
  if (name) {
    source.consumeDescription();
    if (source.word === '=')
      return {
        name,
        description,
        value: (string(source) as { value: string })?.value,
      };
    else return { name, description };
  }
}

export function readEnum(source: SourceFile, context: Context) {
  const description = source.description();
  if (!source.consumeWord('enum')) return undefined;
  const name = source.name();
  if (!name) return source.addError('Expected name for enum');
  if (!source.openClosure())
    return source.addError(`Expected closure open "{" for enum ${name} values`);
  source.consumeDescription();
  const values = atLeastOne('name', readEnumMember, source) || [];
  if (!values) source.addError(`Expected at least one value for enum ${name}`);
  if (!source.closeClosure())
    source.addError(`Expected closure close "}" for enum ${name}`);
  return new Enum({ name, values, description, context });
}
