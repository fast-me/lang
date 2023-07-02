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
  get qualifiedName() {
    return (
      (this.context?.qualifiedName ? this.context.qualifiedName + '.' : '') +
      this.name
    );
  }
  constructor(props: Var) {
    Object.assign(this, props);
    props.context?.add(this);
  }
}
