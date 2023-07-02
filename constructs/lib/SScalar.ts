import { Context } from './Context';

export interface SScalar {
  context: Context;
  name: string;
  description?: string;
  regex: string;
}

export class SScalar {
  constructor({ context, name, description, regex }: SScalar) {
    this.context = context;
    this.name = name;
    this.description = description;
    this.regex = regex;
    context.add(this);
  }
}
