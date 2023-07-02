import { Context } from './Context';

export interface Enum {
  context: Context;
  name: string;
  description?: string;
  values: { name: string; value?: string; description?: string }[];
}

export class Enum {
  constructor({ context, name, values, description }: Enum) {
    this.context = context;
    this.name = name;
    this.description = description;
    this.values = values;
    context.add(this);
  }
}
