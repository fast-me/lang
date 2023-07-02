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
    Object.assign(this, props);
    props.context?.add(this);
  }

  static identifier(context: Context) {
    return new Var({
      name: 'id',
      type: Type.identifier(),
      many: false,
    });
  }
}
