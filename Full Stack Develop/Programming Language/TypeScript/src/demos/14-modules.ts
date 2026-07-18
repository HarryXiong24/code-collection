import { note, show, title } from '../log.js';
// named import: take by name with { }, rename with as; the type prefix imports only the type (disappears after compilation)
import greet, { PI, add, reveal, type Point } from './mathlib.js';
// namespace import: collect all of a module's exports into one object
import * as mathlib from './mathlib.js';

/**
 * Modules / import-export / visibility — TS organizes code with ES Modules (ESM).
 * Key points:
 *   1. One file is one module; its top-level import/export decide its public surface.
 *   2. There can be many named exports (import { a, b }); at most one default export (import x).
 *   3. A binding without export is module-private and inaccessible from outside.
 *   4. import * as ns collects all named exports into a namespace object.
 *   5. import type imports only the type, fully erased after compilation, zero runtime overhead.
 */
export function modulesDemo(): void {
  title('14 Modules / import-export / visibility');

  note('named import: take a named export by name');
  show('PI', PI);
  show('add(2, 3)', add(2, 3));

  note('default import: name it however you like (here it\'s greet)');
  show('greet("Harry")', greet('Harry'));

  note('namespace import: all named exports collected into one object');
  show('Object.keys(mathlib)', Object.keys(mathlib));

  note('module-private: HIDDEN is not exported, obtainable only indirectly via the exported reveal()');
  show('reveal()', reveal());

  note('import type: the type exists only at compile time, absent at runtime');
  const p: Point = { x: 1, y: 2 };
  show('a value annotated with the Point type', p);

  note('import.meta: the module\'s own metadata (ESM-specific)');
  show('end of import.meta.url', import.meta.url.split('/').slice(-2).join('/'));
}
