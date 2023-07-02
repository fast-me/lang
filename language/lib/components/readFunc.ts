import { Context, Func } from 'constructs';
import { SourceFile } from '../SourceFile';
import { getExpression } from './expressions/getExpression';
import { readVar } from './readVar';

const FnRegex = /fn /y;

export function readFunc(
  source: SourceFile,
  context: Context,
  nameRequired: boolean
): Func | undefined {
  const description = source.description();
  if (!source.consume(FnRegex)) return undefined;
  source.description();
  const name = source.name();
  if (nameRequired && !name)
    return source.addError(`Expected Identifier for Fn declaration`);
  const func = new Func({ name: name ?? '', description });
  if (!source.openParens())
    return source.addError(`Expected open inputs (() for fn declaration`);
  let input;
  while ((input = readVar(source, context))) {
    func.add(input);
    source.consumeChar(',');
  }
  if (!source.closeParens())
    source.addError(`Expected close input ()) for fn declaration`);

  if (!source.openClosure()) {
    source.addError('Expected closure open { for fn declaration');
  } else {
    while (!source.openClosure()) {
      const expr = getExpression(source);
      if (expr) func.statements.push(expr);
      else {
        source.addError(
          'Expected statement or closure close } for fn declaration'
        );
      }
    }
  }
  return func;
}
