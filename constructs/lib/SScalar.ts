import { Context } from './Context';
import { Model } from './Model';

export interface SScalar {
  name: string;
  description?: string;
}

export class SScalar extends Model {
  sscalar = true;
}
