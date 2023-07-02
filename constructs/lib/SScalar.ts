import { Context } from './Context';

export interface SScalar {
  context: Context;
  name: string;
  description?: string;
  regex: string;
  min?: number;
  max?: number;
  display?: string;
}

export class SScalar {
  get qualifiedName() {
    return (
      (this.context.qualifiedName ? this.context.qualifiedName + '.' : '') +
      this.name
    );
  }
  constructor({
    context,
    name,
    description,
    regex,
    min,
    max,
    display,
  }: SScalar) {
    this.context = context;
    this.name = name;
    this.description = description;
    this.regex = regex;
    this.min = min;
    this.max = max;
    this.display = display;
    context.add(this);
  }
}
