import { Context, Model, Struct } from 'constructs';
import type { SourceFile } from '../SourceFile';
import { AtLeastOne, atLeastOne } from '../utils/atLeastOne';
import { readEnum } from './readEnum';
import { readFunc } from './readFunc';
import { readNScalar } from './readNScalar';
import { readProperty } from './readProperty';
import { readSScalar } from './readSScalar';

function readModelName(source: SourceFile) {
  if (source.word !== 'alias') return source.name();
}

export function readModel(
  source: SourceFile,
  context: Context
): Model | undefined {
  if (!source.toNextReal()) return;
  let struct = source.consumeWord('struct');
  if (struct) console.log('Reading struct');
  if (
    source.consumeWord('model') ||
    source.consumeWord('concept') ||
    source.consumeWord('entity') ||
    struct
  ) {
    console.log('consume entity');
  } else {
    return;
  }
  const description = source.description();
  let names = atLeastOne('name', readModelName, source);
  let alias: AtLeastOne<string> | undefined = source.consumeWord('alias')
    ? atLeastOne('alias', readModelName, source)
    : undefined;
  if (!names) return;
  const m = new (struct ? Struct : Model)({
    parent: context,
    name: names.last!,
    inherits: names.slice(0, -1),
    description,
    alias,
  });
  source.consumeDescription();
  return readModelContents(source, m);
}

export function readModelContents<T extends Model = Model>(
  source: SourceFile,
  m: T,
  _interface: boolean = false
): T | undefined {
  if (!source.openClosure())
    return source.addError(`Expected closure start in concept`);
  while (!source.closeClosure()) {
    console.log('Loop', m.name, source.word);
    const nscalar = readNScalar(source, m);
    if (nscalar) {
      console.log('Read nscalar');
      continue;
    }
    console.log('Try sscalar');
    const sscalar = readSScalar(source, m);
    if (sscalar) {
      console.log('Read sscalar');
      m.add(sscalar);
      continue;
    }
    console.log('try enum');
    const enuM = readEnum(source, m);
    if (enuM) {
      console.log('Read Enum');
      m.add(enuM);
      continue;
    }
    console.log('try concept');
    const concept = readModel(source, m);
    if (concept) {
      console.log('Read model');
      m.models.push(concept);
      continue;
    }
    console.log('try func');
    const abstract = source.consumeWord('abstract') || _interface;
    const _static = source.consumeWord('static');
    console.log('Start read func');
    const func = readFunc(source, m, true, abstract);
    if (func) {
      console.log('Read func', func.name);
      if (_static) m.staticFunctions.push(func);
      else m.functions.push(func);
      continue;
    }

    console.log('Start read property');
    let pk = source.consumeWord('pk');
    let uniq = !!source.consume(/unique|uniq/y);
    const _var = readProperty(source, m, abstract);
    if (_var) {
      console.log('Read property');
      if (_static) m.staticProperties.push(_var);
      if (pk) m.pk = _var;
      if (uniq) m.uniques.push(_var);
      continue;
    }

    if (!source.closeClosure())
      source.addError(
        `Expected closure end (}), property or method in concept`
      );
    break;
  }
  return m;
}
