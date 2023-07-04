import { Context } from './Context';

export class Runtime {
  app = new Context({ name: 'app' });
  lexical = new Context({ name: 'lexical' });
}
