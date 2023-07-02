import { Context } from './Context';

export interface NScalar {
  context: Context;
  name: string;
  description?: string;
  alias?: string[];
  min?: number;
  max?: number;
  decimals?: number | boolean;
}

export class NScalar {
  constructor({
    context,
    name,
    description,
    alias,
    min,
    max,
    decimals,
  }: NScalar) {
    this.context = context;
    this.name = name;
    this.description = description;
    this.alias = alias;
    this.min = min;
    this.max = max;
    this.decimals = decimals;
    context.add(this);
  }
}
