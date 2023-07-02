import { Context, Model } from 'constructs';
import type { SourceFile } from '../SourceFile';
import { AtLeastOne, atLeastOne } from '../utils/atLeastOne';
import { readEnum } from './readEnum';
import { readFunc } from './readFunc';
import { readNScalar } from './readNScalar';
import { readSScalar } from './readSScalar';
import { readVar } from './readVar';

function readModelName(source: SourceFile) {
  if (source.word !== 'alias') return source.name();
}

export function readModel(
  source: SourceFile,
  context: Context
): Model | undefined {
  if (!source.toNextReal()) return;
  if (
    source.consumeWord('model') ||
    source.consumeWord('concept') ||
    source.consumeWord('entity')
  ) {
    console.log('consume entity');
  }
  console.log('read model');
  const description = source.description();
  let names = atLeastOne('name', readModelName, source);
  let alias: AtLeastOne<string> | undefined = source.consumeWord('alias')
    ? atLeastOne('alias', readModelName, source)
    : undefined;
  if (!names) return;
  if (source.openClosure()) {
  }
  const m = new Model({
    parent: context,
    name: names.last!,
    inherits: names.slice(0, -1),
    description,
    alias,
  });
  source.consumeDescription();
  m.inherits = names.slice(0, -1);
  m.alias =
    (source.consumeWord('alias')
      ? atLeastOne('name', readModelName, source)
      : undefined) || [];
  if (!source.openClosure())
    return source.addError(`Expected closure start in concept`);

  while (!source.closeClosure()) {
    const nscalar = readNScalar(source, m);
    if (nscalar) {
      continue;
    }
    const sscalar = readSScalar(source, m);
    if (sscalar) {
      m.add(sscalar);
      continue;
    }
    const enuM = readEnum(source, m);
    if (enuM) {
      m.add(enuM);
      continue;
    }
    const concept = readModel(source, m);
    if (concept) {
      m.models.push(concept);
      continue;
    }
    const _static = source.consumeWord('static');
    const func = readFunc(source, m, true);
    if (func) {
      if (_static) m.staticFunctions.push(func);
      else m.functions.push(func);
      continue;
    }

    let pk = source.consumeWord('pk');
    let uniq = !!source.consume(/unique|uniq/);
    const _var = readVar(source, m);
    if (_var) {
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
