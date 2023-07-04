import { Context } from './Context';
import { Enum } from './Enum';
import { Func } from './Function';
import { Model } from './Model';
import { NScalar } from './NScalar';
import { SScalar } from './SScalar';
import { Struct } from './Struct';

export enum T {
  bool = 'bool',
  num = 'num',
  str = 'str',
  moment = 'moment',
  enum = 'enum',
  nscalar = 'nscalar',
  sscalar = 'sscalar',
  array = 'array',
  struct = 'struct',
  model = 'model',
}

const aliases = {
  [T.bool]: ['boolean'],
  [T.num]: ['number'],
  [T.str]: ['string'],
  [T.moment]: ['datetime', 'ts', 'timestamp', 'date-time'],
  [T.nscalar]: ['num-scalar', 'number-scalar'],
  [T.sscalar]: ['string-scalar', 'str-scalar'],
};

export const aliased = Object.keys(aliases);

export interface Type {
  name: string;
  t: T;
  raw?: string;
  optional?: boolean;
  element?: Type;
  struct?: Struct;
  model?: Model;
  nscalar?: NScalar;
  sscalar?: SScalar;
  enum?: Enum;
  isOneOrMore?: boolean;
}

export class Type {
  constructor(props: Partial<Type> = { name: 'str' }) {
    Object.assign(this, props);
    this.name = props.name ?? 'str';
    if (!props.t) {
      if (props.element) {
        this.t = T.array;
      } else if (props.struct) {
        this.t = T.struct;
      } else if (props.model) {
        this.t = T.model;
      } else if (props.nscalar) {
        this.t = T.nscalar;
      } else if (props.sscalar) {
        this.t = T.sscalar;
      } else if (props.enum) {
        this.t = T.enum;
      } else {
        for (let t of aliased) {
          if (
            props.name == t ||
            (aliases as any)[t as T].includes(props.name)
          ) {
            this.t = t as T;
            break;
          }
        }
        if (!this.t) this.t = T.str;
      }
    } else {
      this.t = props.t;
    }
  }

  many(optional?: boolean) {
    return new Type({ raw: '[]', name: 'array', optional, element: this });
  }

  static get string() {
    return new Type();
  }

  static identifier(context: Context) {
    return new Type({
      name: 'identifier',
      t: T.sscalar,
      optional: false,
      sscalar: context.scalars.find(
        (it) => it.name === 'identifier'
      ) as SScalar,
    });
  }
}
