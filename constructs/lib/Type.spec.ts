import { describe, it } from 'vitest';
import { T, Type } from './Type';
import { Struct } from './Struct';
import { Context } from './Context';
import { Model } from './Model';
import { NScalar } from './NScalar';
import { SScalar } from './SScalar';
import { Enum } from './Enum';

describe('Type', () => {
  it('should have array type if an element is passed', () => {
    const it = new Type({ element: new Type() });
    expect(it.t).toBe(T.array);
  });
  it('should be a struct type if a Struct is passed', () => {
    const root = new Context({ name: 'root' });
    const it = new Type({
      struct: new Struct({ parent: root, name: 'Hello' }),
    });
    expect(it.t).toBe(T.struct);
  });

  it('should be a model type if a Model is passed', () => {
    const root = new Context({ name: 'root' });
    const it = new Type({
      model: new Model({ parent: root, name: 'Hello' }),
    });
    expect(it.t).toBe(T.model);
  });

  it('should be a number scalar type if a NScalar is passed', () => {
    const root = new Context({ name: 'root' });
    const it = new Type({
      nscalar: new NScalar({ context: root, name: 'Hello' }),
    });
    expect(it.t).toBe(T.nscalar);
  });

  it('should be a string scalar type if a SScalar is passed', () => {
    const root = new Context({ name: 'root' });
    const it = new Type({
      sscalar: new SScalar({ context: root, name: 'Hello', regex: 'abc' }),
    });
    expect(it.t).toBe(T.sscalar);
  });

  it('should be an enum type if an Enum is passed', () => {
    const root = new Context({ name: 'root' });
    const it = new Type({
      enum: new Enum({ context: root, name: 'Hello', values: [] }),
    });
    expect(it.t).toBe(T.enum);
  });

  it('should be a string type if no type is passed', () => {
    const it = new Type();
    expect(it.t).toBe(T.str);
  });

  it('should be a string type if a string is passed', () => {
    const it = new Type({ name: 'Hello', t: T.str });
    expect(it.t).toBe(T.str);
  });

  it('should be a number type if a number is passed', () => {
    const it = new Type({ name: 'Hello', t: T.num });
    expect(it.t).toBe(T.num);
  });

  it('should be a bool type if a bool is passed', () => {
    const it = new Type({ name: 'Hello', t: T.bool });
    expect(it.t).toBe(T.bool);
  });

  it('should be a moment type if a moment is passed', () => {
    const it = new Type({ name: 'Hello', t: T.moment });
    expect(it.t).toBe(T.moment);
  });

  it('should be a string if a string name is passed', () => {
    expect(new Type({ name: 'string' }).t).toBe(T.str);
    expect(new Type({ name: 'str' }).t).toBe(T.str);
  });

  it('should be a number if a number name is passed', () => {
    expect(new Type({ name: 'number' }).t).toBe(T.num);
    expect(new Type({ name: 'num' }).t).toBe(T.num);
  });

  it('should be a bool if a bool name is passed', () => {
    expect(new Type({ name: 'boolean' }).t).toBe(T.bool);
    expect(new Type({ name: 'bool' }).t).toBe(T.bool);
  });

  it('should be a moment if a moment name is passed', () => {
    expect(new Type({ name: 'moment' }).t).toBe(T.moment);
    expect(new Type({ name: 'timestamp' }).t).toBe(T.moment);
    expect(new Type({ name: 'ts' }).t).toBe(T.moment);
    expect(new Type({ name: 'datetime' }).t).toBe(T.moment);
    expect(new Type({ name: 'date-time' }).t).toBe(T.moment);
  });

  it('should be a number scalar if a number scalar name is passed', () => {
    expect(new Type({ name: 'nscalar' }).t).toBe(T.nscalar);
    expect(new Type({ name: 'num-scalar' }).t).toBe(T.nscalar);
    expect(new Type({ name: 'number-scalar' }).t).toBe(T.nscalar);
  });

  it('should be a string scalar if a string scalar name is passed', () => {
    expect(new Type({ name: 'sscalar' }).t).toBe(T.sscalar);
    expect(new Type({ name: 'str-scalar' }).t).toBe(T.sscalar);
    expect(new Type({ name: 'string-scalar' }).t).toBe(T.sscalar);
  });

  it('many() should return an array type with element being this', () => {
    const num = new Type({ name: 'num' });
    const many = num.many(true);
    expect(many.t).toBe(T.array);
    expect(many.element).toBe(num);
    expect(many.optional).toBe(true);
    const many2 = num.many();
    expect(many2.optional).toBeUndefined();
  });

  it('should default to being a string', () => {
    const it = new Type({});
    expect(it.t).toBe(T.str);
  });
});
