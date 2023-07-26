import { Model, ModelInit } from './Model';

export class Struct extends Model {
  struct = true;
  constructor(props: ModelInit) {
    super(props);
  }
}
