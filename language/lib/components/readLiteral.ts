import { SourceFile } from '../SourceFile';
import { getExpression } from './expressions/getExpression';

export interface Literal {
  name: string;
  properties: {
    name: string;
    optional?: boolean;
    type: 'regex' | 'expr' | 'word' | 'number';
  }[];
}

export function readLiteral(construct: Literal, source: SourceFile) {
  if (!source.openClosure()) {
    source.addError(`expected close closure for literal ${construct.name}`);
  }
  const ret: any = { type: construct.name };
  while (true) {
    let didConsume = false;
    for (const property of construct.properties) {
      if (source.consumeWord(property.name)) {
        didConsume = true;
        switch (property.type) {
          case 'regex':
            {
              const regex = source.consumeRegexLiteral();
              if (!regex) {
                source.addError(
                  `expected regex for literal ${construct.name}.${property.name}`
                );
              } else {
                ret[property.name] = regex;
              }
            }
            break;
          case 'number':
            {
              const number = source.consumeNumber();

              if (!number) {
                source.addError(
                  `expected number for literal ${construct.name}.${property.name}`
                );
              } else {
                ret[property.name] = number;
              }
            }
            break;
          case 'expr':
            {
              const expr = getExpression(source);
              if (!expr) {
                source.addError(
                  `expected string for literal ${construct.name}.${property.name}`
                );
              } else {
                ret[property.name] = expr;
              }
            }
            break;
          case 'word': {
            const word = source.consumeWord();
            if (!word) {
              source.addError(
                `expected word for literal ${construct.name}.${property.name}`
              );
            } else {
              ret[property.name] = word;
            }
          }
        }
      }
    }
    if (!didConsume) {
      if (!source.closeClosure()) {
        source.addError(`Expected property name for literal ${construct.name}`);
        source.addError(`Expected close closure for literal ${construct.name}`);
        break;
      }
      break;
    }
  }
  for (const property of construct.properties) {
    if (!ret[property.name] && !property.optional) {
      source.addError(
        `expected property ${property.name} for literal ${construct.name}`
      );
    }
  }
  return ret;
}
