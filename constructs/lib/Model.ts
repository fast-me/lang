import { Context, InitContext } from './Context';
import { Func } from './Function';
import { Relationship } from './Relationship';
import { Type } from './Type';
import { Var } from './Var';

export interface Model extends Context {
  parent: Context;
  interface?: boolean;
  pk?: Var;
  uniques: (Var | Var[])[];
  inherits: string[];
  alias: string[];
  relationships: Relationship[];
  staticProperties: Var[];
  staticFunctions: Func[];
}
export type ModelInit = Partial<Model> & InitContext & { parent: Context };

export class Model extends Context {
  get id() {
    return `${this.constructor.name.toLowerCase()}:${this.qualifiedName}`;
  }
  constructor({
    inherits = [],
    alias = [],
    relationships = [],
    interface: _interface = false,
    staticFunctions = [],
    staticProperties = [],
    ...rest
  }: ModelInit) {
    super(rest);
    this.inherits = inherits;
    if (_interface) this.interface = true;
    this.alias = alias;
    this.relationships = relationships;
    this.staticFunctions = staticFunctions;
    this.staticProperties = staticProperties;
    this.parent.add(this);
    // @ts-expect-error ts sucks
    if ((this.constructor.name === 'Model' && !this.interface) || this.struct) {
      this.vars.push(
        new Var({
          name: 'id',
          type: Type.identifier(this.parent.root),
        })
      );
    }
  }
}
