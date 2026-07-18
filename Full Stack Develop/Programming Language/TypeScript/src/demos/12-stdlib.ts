import { note, show, title } from '../log.js';

/**
 * Common standard-library idioms — high-frequency operations on JSON, dates, strings, numbers, arrays.
 * Key points:
 *   1. JSON.stringify / parse do serialization; note a Date becomes a string.
 *   2. Dates use the built-in Date; complex time zones/formatting often use a third-party library in production.
 *   3. Strings are immutable; methods all return a new string.
 *   4. Intl.* does localized formatting (currency, numbers, dates).
 *   5. Array's map/filter/reduce/some/every/flatMap are the daily workhorses.
 */
export function stdlibDemo(): void {
  title('12 Common standard-library idioms');

  note('JSON: object ↔ string');
  const user = { id: 1, name: 'Harry', roles: ['dev', 'admin'] };
  const json = JSON.stringify(user);
  show('JSON.stringify', json);
  show('JSON.parse(...).roles', (JSON.parse(json) as typeof user).roles);
  show('with indentation', JSON.stringify({ a: 1 }, null, 2).replace(/\n/g, '\\n'));

  note('dates: ISO string, timestamp, arithmetic');
  const d = new Date('2026-07-16T08:00:00Z');
  show('toISOString', d.toISOString());
  show('getTime() (millisecond timestamp)', d.getTime());
  const tomorrow = new Date(d.getTime() + 24 * 3600 * 1000);
  show('+1 day', tomorrow.toISOString().slice(0, 10));

  note('strings: immutable, methods return a new string');
  const s = '  Hello, TypeScript  ';
  show('trim()', s.trim());
  show('toUpperCase()', s.trim().toUpperCase());
  show('split(",")', 'a,b,c'.split(','));
  show('replaceAll', 'a-b-c'.replaceAll('-', '_'));
  show('padStart', '7'.padStart(3, '0'));
  show('includes', 'typescript'.includes('script'));

  note('number formatting: toFixed and Intl (currency/thousands separators)');
  show('(1234.5).toFixed(2)', (1234.5).toFixed(2));
  show('currency', new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(19999.9));

  note('array advanced: flatMap / some / every / Array.from');
  show('flatMap', [1, 2, 3].flatMap((n) => [n, n * 10]));
  show('some > 2', [1, 2, 3].some((n) => n > 2));
  show('every > 0', [1, 2, 3].every((n) => n > 0));
  show('Array.from({length:3})', Array.from({ length: 3 }, (_, i) => i * i));

  note('Object utilities: entries / fromEntries for "dictionary ↔ array" conversion');
  const doubled = Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2]));
  show('fromEntries(map)', doubled);
}
