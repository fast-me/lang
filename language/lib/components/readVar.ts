import { Context, Var } from 'constructs';
import { SourceFile } from '../SourceFile';
import { getExpression } from './expressions/getExpression';
import { readType } from './readType';

export function readVar(
  source: SourceFile,
  context: Context,
  name?: string,
  description?: string,
  abstract?: boolean
): Var | undefined {
  let readonly = source.consumeWord('const');
  if (name === undefined) name = source.qualifiedName();
  if (!name) return undefined;
  let optional = source.consumeChar('?');
  const type = readType(source, name, optional);
  const value = source.consumeChar('=')
    ? getExpression(source, context)
    : undefined;
  return new Var({
    context: context,
    name,
    description,
    type,
    value,
    readonly,
    abstract,
  });
}
