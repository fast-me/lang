import { Context, InitContext } from './Context';
import { Expression } from './Expression';
import { Type } from './Type';

export interface Func extends Context {
  statements: Expression[];
  parent: Context;
  return?: Type;
  async?: boolean;
}

export class Func extends Context {
  constructor(
    props: InitContext & {
      statements?: Expression[];
      parent: Context;
      return?: Type;
      async?: boolean;
    }
  ) {
    super(props);
    this.statements = props.statements ?? [];
    this.return = props.return;
    this.async = props.async;
  }
}
