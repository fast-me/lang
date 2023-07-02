import { Context } from './Context';

export interface SScalar {
  context: Context;
  name: string;
  description?: string;
  regex: string;
}

export class SScalar {
  get qualifiedName() {
    return (
      (this.context.qualifiedName ? this.context.qualifiedName + '.' : '') +
      this.name
    );
  }
  constructor({ context, name, description, regex }: SScalar) {
    this.context = context;
    this.name = name;
    this.description = description;
    this.regex = regex;
    context.add(this);
  }
}
