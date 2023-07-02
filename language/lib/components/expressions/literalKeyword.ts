import { Expression } from 'constructs';
import { SourceFile } from '../../SourceFile';

const LiteralKeywords = {
  null: 'null',
  undefined: 'undefined',
  true: 'true',
  false: 'false',
} as const;

export function literalKeyword(source: SourceFile): Expression | undefined {
  const literal = source.consumeHash(LiteralKeywords);
  if (literal) {
    switch (literal) {
      case 'null':
      case 'undefined':
        return { type: literal };
      default:
        return { type: 'boolean', value: literal === 'true' };
    }
  }
  return undefined;
}
