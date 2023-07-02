import { SourceFile } from '../../SourceFile';
import { getExpression } from './getExpression';
import { Expression, Math } from 'constructs';

export function isStringEscaped(str: string, index: number) {
  return str[index - 1] === '\\' && str[index - 2] === '\\';
}
const SingleQuote = /'/g;
const Interpolate = /\$\{/g;

export function string(source: SourceFile): Expression | undefined {
  if (!source.consumeChar("'")) return undefined;
  const strParts: Expression[] = [];
  SingleQuote.lastIndex = source.index;
  let closeQuoteIndex: undefined | number = undefined;
  while (closeQuoteIndex === undefined) {
    const quoteIndex = SingleQuote.exec(source.input)?.index;
    if (quoteIndex === undefined)
      return source.addError(`Unable to find close quote for string`);
    if (isStringEscaped(source.input, quoteIndex)) {
      continue;
    }
    closeQuoteIndex = quoteIndex;
  }
  Interpolate.lastIndex = source.index;
  while (true) {
    const interIndex = Interpolate.exec(source.input)?.index;
    if (!interIndex || interIndex > closeQuoteIndex) {
      break;
    } else if (isStringEscaped(source.input, interIndex)) {
      continue;
    }
    strParts.push({
      type: 'string',
      value: source.input.slice(source.index, interIndex),
    });
    source.move(interIndex - source.index + 2);
    const expr = getExpression(source);
    if (!expr)
      return source.addError(
        `Expected valid expression for string interplation`
      );
    strParts.push(expr);
    if (!source.closeClosure())
      return source.addError(
        `Expected closure close (}) for string interpolation`
      );
  }
  strParts.push({
    type: 'string',
    value: source.input.slice(source.index, closeQuoteIndex),
  });
  source.move(closeQuoteIndex + 1 - source.index);
  const values = strParts.filter(
    (it) => !(it.type === 'string' && it.value === '')
  );
  return values.length > 1
    ? {
        type: 'math',
        values: values.insertBetween(Math.add),
      }
    : { type: 'string', value: (values[0] as { value: string })?.value ?? '' };
}
