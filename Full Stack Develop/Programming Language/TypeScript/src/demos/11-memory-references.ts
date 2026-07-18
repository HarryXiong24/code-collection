import { note, show, title } from '../log.js';

/**
 * Memory / references / copying — JS has no raw pointers, but the "reference vs value" trap is everywhere.
 * Key points:
 *   1. Primitive values (number/string/boolean…) are copied by value; objects/arrays/functions by reference.
 *   2. Assignment and argument passing pass "a copy of the reference", so mutating the interior affects each other.
 *   3. Shallow copy {...o} / [...a] copies only one level; deeper data is still shared.
 *   4. Deep copy uses structuredClone() (built into modern runtimes).
 *   5. === compares objects by "same reference?", not "same content?".
 */
export function memoryReferencesDemo(): void {
  title('11 Memory / references / copying');

  note('primitive values are copied by value: changing the copy doesn\'t affect the original');
  let a = 10;
  let b = a;
  b += 5;
  show('a / b', [a, b]);

  note('objects are copied by reference: two variables point at the same memory');
  const o1 = { count: 1 };
  const o2 = o1;
  o2.count = 99;
  show('o1.count (changed via o2)', o1.count);
  show('o1 === o2', o1 === o2);

  note('=== compares references, not content: same content but not the same object → false');
  show('{x:1} === {x:1}', ({ x: 1 } as object) === ({ x: 1 } as object));

  note('shallow copy copies only one level: nested objects are still shared');
  const original = { name: 'Harry', tags: ['a', 'b'] };
  const shallow = { ...original };
  shallow.tags.push('c'); // this changes the shared array
  show('original.tags (changed via the shallow copy)', original.tags);

  note('deep copy: structuredClone fully severs the references');
  const deep = structuredClone(original);
  deep.tags.push('z');
  show('original.tags (unaffected by deep copy)', original.tags);
  show('deep.tags', deep.tags);

  note('argument passing also passes a copy of the reference: a function can mutate the object interior, but reassigning doesn\'t affect the outside');
  const mutate = (obj: { count: number }): void => {
    obj.count += 1; // mutating the interior → visible outside
  };
  const reassign = (obj: { count: number }): void => {
    obj = { count: -1 }; // only swaps the local reference → invisible outside
  };
  const box = { count: 0 };
  mutate(box);
  reassign(box);
  show('box.count', box.count);

  note('freezing: Object.freeze makes an object shallowly read-only (changes throw under strict)');
  const frozen = Object.freeze({ pi: 3.14 });
  show('Object.isFrozen', Object.isFrozen(frozen));
}
