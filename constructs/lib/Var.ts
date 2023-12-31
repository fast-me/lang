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
  abstract?: boolean;
}

export class Var {
  constructor(props: Var) {
    Object.assign(this, props);
    props.context?.add(this);
  }

  static identifier(context: Context) {
    return new Var({
      name: 'id',
      type: Type.identifier(context),
      value: {
        type: 'invocation',
        fn: { name: 'identifier.new' },
        inputs: [],
      },
    });
  }
}
