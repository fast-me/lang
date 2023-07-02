import { Expression, Math, Reference } from 'constructs';
import { SourceFile } from '../../SourceFile';
import { readVar } from '../readVar';

const MathUnaries = {
  '++': Math.add,
  '--': Math.subtract,
  '**': Math.power,
  '//': Math.root,
} as const;
const MathUnaryKeys = Object.keys(MathUnaries) as (keyof typeof MathUnaries)[];

export function prefix(source: SourceFile): Expression | undefined {
  const mathUnaryPrefix = MathUnaryKeys.find((it) => source.startsWith(it));
  if (!mathUnaryPrefix) return;
  source.move(mathUnaryPrefix.length);
  const op = MathUnaries[mathUnaryPrefix];
  const id = source.qualifiedName();
  if (!id)
    return source.addError(
      `Expected var identifier for ${op} unary prefix (${mathUnaryPrefix}) operator`
    );
  const variable = readVar(source, undefined, id);
  if (!variable) {
    return source.addError(
      `Unable to resolve reference for ${op} unary prefix (${mathUnaryPrefix}) operator`
    );
  }
  return {
    type: 'assign',
    to: { type: 'var', value: variable },
    value: {
      type: 'math',
      values: [
        { type: 'var', value: variable },
        op,
        {
          type: 'number',
          value: op === Math.power || op === Math.subtract ? '2' : '1',
        },
      ],
    },
  };
}

export function postfix(
  source: SourceFile,
  ref: Reference
): Expression | undefined {
  const mathUnaryPostfix = MathUnaryKeys.find((it) => source.startsWith(it));
  if (!mathUnaryPostfix || source.input[source.index - 1].isWhitespace) return;
  source.move(mathUnaryPostfix.length);
  const op = MathUnaries[mathUnaryPostfix];
  return {
    type: 'return',
    value: { type: 'reference', ref },
    exec: {
      type: 'assign',
      to: { type: 'reference', ref },
      value: {
        type: 'math',
        values: [
          { type: 'reference', ref },
          op,
          {
            type: 'number',
            value: op === Math.power || op === Math.subtract ? '2' : '1',
          },
        ],
      },
    },
  };
}
