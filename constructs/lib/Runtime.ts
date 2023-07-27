import { Context } from './Context';

export class Runtime {
  app = new Context({ name: 'app', root: true });
  lexical = new Context({ name: 'lexical', root: true });
}
