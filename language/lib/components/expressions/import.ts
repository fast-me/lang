import { Context, Model } from 'constructs';
import { Expression } from '../../../../constructs/lib/Expression';
import { SourceFile } from '../../SourceFile';
import { readModelContents } from '../readModel';

const PackageName = /[a-zA-Z\/\-_\.@0-9]+/y;
export function _import(
  source: SourceFile,
  context: Context
): Expression | undefined {
  if (!source.consumeWord('import', true)) return;
  console.log('Consumed import');
  if (!source.openParens()) {
    source.addError("Expected open parens after 'import'");
    return;
  }
  console.log('Consuming pkg name');
  const _package = source.consume(PackageName);
  if (!_package) {
    source.addError('Expected package name after import');
    return;
  }
  const pkg = _package[0];
  console.log("Consumed package name: '" + pkg + "'");
  if (!source.closeParens()) {
    source.addError("Expected close parens after 'import' package name");
    return;
  }
  let _interface: Model | undefined;
  if (source.isNextOpenClosure()) {
    console.log('Consuming interface');
    _interface = new Model({
      parent: context.root,
      name: pkg,
      description: `${pkg} interface`,
      inherits: [],
    });
    readModelContents(source, _interface, true);
  }
  return { type: 'import', package: pkg, interface: _interface };
}
