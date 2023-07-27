import { Context, Func } from 'constructs';
import { SourceFile } from '../SourceFile';
import { getExpression } from './expressions/getExpression';
import { readVar } from './readVar';
import { readType } from './readType';

const FnRegex = /fn /y;
const FnNameRegex = /[a-zA-Z0-9\-=+*_/&%$]+/y;

export function readFunc(
  source: SourceFile,
  context: Context,
  nameRequired: boolean,
  abstract: boolean = false
): Func | undefined {
  const description = source.description();
  if (!source.consume(FnRegex)) return undefined;
  const async = source.consumeWord('async');
  source.description();
  const name = source.consume(FnNameRegex)?.[0];
  if (nameRequired && !name)
    return source.addError(`Expected Identifier for Fn declaration`);
  const func = new Func({
    name: name ?? '',
    description,
    parent: context,
    async,
  });
  if (source.openParens()) {
    let input;
    while ((input = readVar(source, func))) {
      source.consumeChar(',');
    }
    if (!source.closeParens())
      source.addError(`Expected close input ()) for fn declaration`);
  }
  console.log('Read arguments');
  if (source.consumeChar(':')) {
    const type = readType(source, 'return');
    if (!type)
      source.addError(`Expected type after : for fn declaration return`);
    else func.return = type;
  }
  console.log('Read type', name);
  if (!source.openClosure()) {
    if (!abstract)
      source.addError('Expected closure open { for fn declaration');
  } else {
    while (!source.closeClosure()) {
      const expr = getExpression(source, context);
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
