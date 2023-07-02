import { Context } from './Context';
import { Enum } from './Enum';
import { Func } from './Function';
import { Model } from './Model';
import { NScalar } from './NScalar';
import { SScalar } from './SScalar';
import { Struct } from './Struct';
import { Type } from './Type';
import { Var } from './Var';

describe('Context', () => {
  it('root should return the root context', () => {
    const root = new Context({ name: 'root' });
    const root1 = new Context({ parent: root, name: 'root1' });
    const root2 = new Context({ parent: root1, name: 'root2' });
    expect(root2.root).toBe(root);
  });
  it('root should return itself when root', () => {
    const root = new Context({ name: 'root' });
    expect(root.root).toBe(root);
  });

  it("add should add a var to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new Var({ context: root, name: 'var', type: Type.string });
    expect(root.vars).toHaveLength(1);
    expect(root.vars[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it("add should add an nscalar to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new NScalar({ context: root, name: 'var' });
    expect(root.scalars).toHaveLength(1);
    expect(root.scalars[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it("add should add an sscalar to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new SScalar({ context: root, name: 'var', regex: 'abc' });
    expect(root.scalars).toHaveLength(1);
    expect(root.scalars[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it("add should add a struct to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new Struct({ parent: root, name: 'mystruct' });
    expect(root.names['mystruct']).toBe(_var);
    expect(root.structs).toHaveLength(1);
    expect(root.structs[0]).toBe(_var);
  });

  it("add should add an enum to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new Enum({ context: root, name: 'var', values: [] });
    expect(root.enums).toHaveLength(1);
    expect(root.enums[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it("add should add a func to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new Func({ parent: root, name: 'var' });
    expect(root.functions).toHaveLength(1);
    expect(root.functions[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it("add should add a model to names and to it's array", () => {
    const root = new Context({ name: 'root' });
    const _var = new Model({ parent: root, name: 'var' });
    expect(root.models).toHaveLength(1);
    expect(root.models[0]).toBe(_var);
    expect(root.names['var']).toBe(_var);
  });

  it('get should retrieve any add definition with the same name', () => {
    const root = new Context({ name: 'root' });
    const _var = new Model({ parent: root, name: 'var' });
    root.add(_var);
    expect(root.get('var')).toBe(_var);
  });

  it('get should retrive an add definition from a parent', () => {
    const root = new Context({ name: 'root' });
    const _var = new Model({ parent: root, name: 'var' });
    const root1 = new Context({ name: 'root1', parent: root });
    const root2 = new Context({ name: 'root2', parent: root1 });
    expect(root2.get('var')).toBe(_var);
  });

  it('get should retreive nothing if name is not defined', () => {
    const root = new Context({ name: 'root' });
    expect(root.get('var')).toBeUndefined();
  });
});
