import { Context, InitContext } from './Context';
import { Func } from './Function';
import { Relationship } from './Relationship';
import { Var } from './Var';

export interface Model extends Context {
  parent: Context;
  pk?: Var;
  uniques: (Var | Var[])[];
  inherits: string[];
  alias: string[];
  relationships: Relationship[];
  staticProperties: Var[];
  staticFunctions: Func[];
}

export class Model extends Context {
  constructor({
    inherits = [],
    alias = [],
    relationships = [],
    staticFunctions = [],
    staticProperties = [],
    ...rest
  }: Partial<Model> & InitContext & { parent: Context }) {
    super(rest);
    this.inherits = inherits;
    this.alias = alias;
    this.relationships = relationships;
    this.staticFunctions = staticFunctions;
    this.staticProperties = staticProperties;
    this.parent.add(this);
  }
}
