import { note, show, title } from '../log.js';

/**
 * Types & variables — TypeScript = JavaScript + static types.
 * Key points:
 *   1. let / const declarations; const can't be reassigned (but an object's interior is still mutable).
 *   2. Primitive types: string / number / boolean / bigint / symbol / null / undefined.
 *   3. The type annotation `: T` is optional; the compiler can usually infer it.
 *   4. number is a single type (IEEE-754 double); use bigint for large integers.
 *   5. Checked at compile time, erased at runtime — types don't participate at runtime.
 */
export function typesDemo(): void {
  title('01 Types & variables');

  note('const infers the literal type "Harry"; let infers the wider string');
  const name = 'Harry'; // type: "Harry"
  let city = 'Shenzhen'; // type: string
  city = 'Beijing';
  show('typeof name', typeof name);
  show('name / city', [name, city]);

  note('explicit annotation: write it only when inference fails or you want it stricter');
  const age: number = 30;
  const price = 9.99; // number doesn't distinguish int/float
  const isVip: boolean = true;
  show('age / price / isVip', [age, price, isVip]);

  note('use bigint for large integers, literals end in n, and it can\'t be mixed directly with number');
  const big = 9007199254740993n; // still exact beyond Number.MAX_SAFE_INTEGER
  show('big + 1n', big + 1n);
  show('Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER);

  note('null and undefined are two distinct empty values; under strict you can\'t freely assign them to other types');
  const maybe: string | undefined = undefined;
  const empty: string | null = null;
  show('maybe ?? "default"', maybe ?? 'default'); // ?? falls back only on null/undefined
  show('empty ?? "fallback"', empty ?? 'fallback');

  note('template strings and type conversion');
  const n = 42;
  show('`value=${n}`', `value=${n}`);
  show('Number("3.14")', Number('3.14'));
  show('String(true)', String(true));
  show('parseInt("08px", 10)', parseInt('08px', 10));

  note('as const: lock a value into a readonly literal, often used for config');
  const config = { env: 'prod', retries: 3 } as const; // every field becomes readonly
  show('config', config);

  note('typeof / instanceof are runtime type checks');
  show('typeof 42', typeof 42);
  show('typeof []', typeof []);
  show('[] instanceof Array', [] instanceof Array);
}
