import { Context, InitContext } from './Context';
import { Expression } from './Expression';
import { Type } from './Type';

export interface Func extends Context {
  statements: Expression[];
  parent: Context;
  return?: Type;
}

export class Func extends Context {
  constructor(
    props: InitContext & {
      statements?: Expression[];
      parent: Context;
      return?: Type;
    }
  ) {
    super(props);
    this.statements = props.statements ?? [];
    this.return = props.return;
    props.parent?.add(this);
  }
}
