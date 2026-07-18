import { error, note, title } from './log.js';
import { typesDemo } from './demos/01-types.js';
import { collectionsDemo } from './demos/02-collections.js';
import { functionsDemo } from './demos/03-functions.js';
import { controlFlowDemo } from './demos/04-control-flow.js';
import { structsClassesInterfacesDemo } from './demos/05-structs-classes-interfaces.js';
import { genericsDemo } from './demos/06-generics.js';
import { errorHandlingDemo } from './demos/07-error-handling.js';
import { asyncDemo } from './demos/08-async.js';
import { advancedTypesDemo } from './demos/09-advanced-types.js';
import { decoratorsDemo } from './demos/10-decorators.js';
import { memoryReferencesDemo } from './demos/11-memory-references.js';
import { stdlibDemo } from './demos/12-stdlib.js';
import { iteratorsDemo } from './demos/13-iterators.js';
import { modulesDemo } from './demos/14-modules.js';
import { sortingEqualityDemo } from './demos/15-sorting-equality.js';

/** demo name → function. The names are used by `npm start types generics` to run only the specified ones. */
const DEMOS: Record<string, () => void | Promise<void>> = {
  types: typesDemo,
  collections: collectionsDemo,
  functions: functionsDemo,
  'control-flow': controlFlowDemo,
  classes: structsClassesInterfacesDemo,
  generics: genericsDemo,
  errors: errorHandlingDemo,
  async: asyncDemo,
  'advanced-types': advancedTypesDemo,
  decorators: decoratorsDemo,
  memory: memoryReferencesDemo,
  stdlib: stdlibDemo,
  iterators: iteratorsDemo,
  modules: modulesDemo,
  sorting: sortingEqualityDemo,
};

function selected(): string[] {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  if (args.length === 0) return Object.keys(DEMOS);
  const unknown = args.filter((a) => !(a in DEMOS));
  if (unknown.length > 0) {
    error(`unknown demo: ${unknown.join(', ')}`);
    note(`options: ${Object.keys(DEMOS).join(' | ')}`);
    process.exit(1);
  }
  return args;
}

async function main(): Promise<void> {
  title('TypeScript language usage demos');
  for (const name of selected()) {
    const fn = DEMOS[name];
    if (fn) await fn();
  }
  console.log();
}

main().catch((e) => {
  error((e as Error).stack ?? String(e));
  process.exit(1);
});
