import { Expression } from './Expression';
import { Func } from './Function';

describe('Function', () => {
  it('should initialize with statements', () => {
    const statements: Expression[] = [{ type: 'undefined' }];
    const it = new Func({ name: 'fn', statements });
    expect(it.statements).toEqual(statements);
  });
});
