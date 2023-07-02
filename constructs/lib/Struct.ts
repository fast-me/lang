import { Context, InitContext } from './Context';

export class Struct extends Context {
  override parent!: Context;
  constructor(props: InitContext & { parent: Context }) {
    super(props);
    props.parent?.add(this);
  }
}
