import { note, show, title } from '../log.js';

/**
 * Control flow — conditionals, loops, switch, truthiness.
 * Key points:
 *   1. if / else if / else and the ternary ? :.
 *   2. TS has no native match; use switch or "discriminated union + switch".
 *   3. for...of iterates values, for...in iterates keys, entries() gives the index too.
 *   4. Mind "falsy" values: 0 / "" / null / undefined / NaN / false are all falsy.
 *   5. Use never to make switch do "exhaustiveness checking".
 */

type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; side: number }
  | { kind: 'rect'; w: number; h: number };

// discriminated union + switch: assign s to never in default, so a missing branch is a compile error
function area(s: Shape): number {
  switch (s.kind) {
    case 'circle':
      return Math.PI * s.r ** 2;
    case 'square':
      return s.side ** 2;
    case 'rect':
      return s.w * s.h;
    default: {
      const _exhaustive: never = s; // add a new kind and miss a branch → won't compile here
      return _exhaustive;
    }
  }
}

export function controlFlowDemo(): void {
  title('04 Control flow');

  note('if / ternary / logical operators');
  const score = 82;
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';
  show('grade', grade);

  note('for...of iterates values; .entries() gives [index, value]');
  const fruits = ['apple', 'banana', 'cherry'];
  for (const [i, f] of fruits.entries()) show(`fruits[${i}]`, f);

  note('for...in iterates an object\'s keys');
  const obj = { a: 1, b: 2 };
  for (const key in obj) show(`key`, key);

  note('while / do-while');
  let n = 3;
  const stack: number[] = [];
  while (n > 0) stack.push(n--);
  show('while collected', stack);

  note('discriminated union + exhaustive switch (a missing branch is a compile error)');
  show('area(circle r=2)', area({ kind: 'circle', r: 2 }).toFixed(2));
  show('area(rect 3x4)', area({ kind: 'rect', w: 3, h: 4 }));

  note('truthiness trap: 0 and "" are both falsy, be careful checking for empty');
  const count = 0;
  show('count || "N/A"', count || 'N/A'); // 0 treated as falsy → falls into the fallback (a common bug)
  show('count ?? "N/A"', count ?? 'N/A'); // ?? falls back only on null/undefined → keeps 0
}
