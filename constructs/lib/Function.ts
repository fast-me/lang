import { Context, InitContext } from './Context';
import { Expression } from './Expression';

export interface Func extends Context {
  statements: Expression[];
  parent: Context;
}

export class Func extends Context {
  constructor(
    props: InitContext & { statements?: Expression[]; parent: Context }
  ) {
    super(props);
    this.statements = props.statements ?? [];
    props.parent?.add(this);
  }
}
