import { Model } from './Model';
import { Var } from './Var';

export enum Compound {
  and = 'and',
  or = 'or',
}

export enum Math {
  add = 'add',
  subtract = 'subtract',
  multiply = 'multiply',
  divide = 'divide',
  power = 'power',
  root = 'root',
}

export type Reference = {
  name: string;
};

export type Expression =
  | { type: 'undefined' }
  | { type: 'null' }
  | { type: 'boolean'; value: boolean }
  | { type: 'string'; value: string }
  | { type: 'number'; value: string }
  | { type: 'var'; value: Var }
  | { type: 'not'; value: Expression }
  | { type: 'compound' | 'binary_compound'; values: (Compound | Expression)[] }
  | { type: 'math'; values: (Math | Expression)[] }
  | { type: 'reference'; ref: Reference }
  | {
      type: 'invocation';
      fn: Reference;
      inputs: Expression[];
    }
  | { type: 'import'; package: string; interface?: Model }
  | { type: 'assign'; value: Expression; to: Expression }
  | { type: 'compare'; left: Expression; right: Expression }
  | { type: 'return'; value?: Expression; exec?: Expression }
  | { type: 'object'; properties: { name: string; value: Expression }[] }
  | { type: 'splat'; ref: Reference }
  | {
      type: 'if';
      branches: { condition: Expression; statements: Expression[] }[];
      else?: Expression[];
    }
  | {
      type: 'array';
      entries: Expression[];
    };
