import { assign } from 'lodash';
import { Context } from './Context';
import { Expression } from './Expression';
import { Type } from './Type';

export interface Var {
  context?: Context;
  name: string;
  type: Type;
  value?: Expression;
  readonly?: boolean;
  description?: string;
}

export class Var {
  constructor(props: Var) {
    assign(this, props);
    props.context?.add(this);
  }
}
