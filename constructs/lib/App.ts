import { Context } from './Context';
import { Model } from './Model';
import { Type } from './Type';
import { Var } from './Var';

export const App = (root: Context): Var => {
  const model = new Model({
    name: 'app',
    description: 'The root of the application',
    parent: root,
    properties: [{ id: 'id', type: Type.idenifier() }],
  });
  return new Var({
    name: 'app',
    type: new Type({}),
  });
};

export function parseApp() {}
