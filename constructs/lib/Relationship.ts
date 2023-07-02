import { Var } from './Var';

export interface Relationship extends Var {
  sort?: { key: string; desc: boolean };
  inverse?: Relationship;
  inverseName?: string;
}

export class Relationship extends Var {
  constructor(props: Relationship) {
    super(props);
  }
}
