import type { Enum } from './Enum';
import type { Func } from './Function';
import type { Model } from './Model';
import { NScalar } from './NScalar';
import type { SScalar } from './SScalar';
import type { Struct } from './Struct';
import type { Var } from './Var';

type Definition = Var | SScalar | NScalar | Enum | Func | Model | Struct;

export interface Context {
  parent?: Context;
  description?: string;
  name: string;
  vars: Var[];
  scalars: (SScalar | NScalar)[];
  structs: Struct[];
  enums: Enum[];
  functions: Func[];
  models: Model[];
  names: { [key: string]: Definition };
}

export type InitContext = {
  name: string;
  description?: string;
  parent?: Context;
  root?: boolean;
};

export class Context {
  vars: Var[] = [];
  scalars: (NScalar | SScalar)[] = [];
  structs: Struct[] = [];
  enums: Enum[] = [];
  functions: Func[] = [];
  models: Model[] = [];
  names: { [key: string]: Definition } = {};
  get qualifiedName(): string {
    if (this.isRoot) return '';
    const p = this.parent?.qualifiedName ?? '';
    return p ? `${p}.${this.name}` : this.name;
  }
  isRoot?: boolean;
  constructor({ name, parent, description, root }: InitContext) {
    this.parent = parent;
    this.name = name;
    this.description = description;
    if (root) {
      this.isRoot = true;
    }
  }

  add(def: Definition) {
    switch (def.constructor.name) {
      case 'Var':
        this.vars.push(def as Var);
        break;
      case 'SScalar':
      case 'NScalar':
        this.scalars.push(def as NScalar);
        break;
      case 'Struct':
        this.structs.push(def as Struct);
        break;
      case 'Enum':
        this.enums.push(def as Enum);
        break;
      case 'Func':
        this.functions.push(def as Func);
        break;
      case 'Model':
        this.models.push(def as Model);
    }
    this.addName(def);
  }

  private addName(def: Definition) {
    this.names[def.name] = def;
  }

  get(name: string): Definition | undefined {
    return this.names[name] ?? this.parent?.get(name);
  }

  get root() {
    let root: Context = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }
}
