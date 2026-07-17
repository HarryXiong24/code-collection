import { note, show, title } from '../log.js';

/**
 * 控制流 —— 条件、循环、switch、真值判断。
 * 要点：
 *   1. if / else if / else 与三元 ? :。
 *   2. TS 没有原生 match，用 switch 或「可辨识联合 + switch」。
 *   3. for...of 遍历值，for...in 遍历键，entries() 同时拿下标。
 *   4. 注意「假值」：0 / "" / null / undefined / NaN / false 都是 falsy。
 *   5. 用 never 让 switch 做到「穷尽检查」。
 */

type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; side: number }
  | { kind: 'rect'; w: number; h: number };

// 可辨识联合 + switch：default 里把 s 赋给 never，漏掉分支时编译报错
function area(s: Shape): number {
  switch (s.kind) {
    case 'circle':
      return Math.PI * s.r ** 2;
    case 'square':
      return s.side ** 2;
    case 'rect':
      return s.w * s.h;
    default: {
      const _exhaustive: never = s; // 新增 kind 又漏了分支 → 这里编译不过
      return _exhaustive;
    }
  }
}

export function controlFlowDemo(): void {
  title('04 控制流');

  note('if / 三元 / 逻辑运算');
  const score = 82;
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';
  show('grade', grade);

  note('for...of 遍历值；.entries() 拿到 [下标, 值]');
  const fruits = ['apple', 'banana', 'cherry'];
  for (const [i, f] of fruits.entries()) show(`fruits[${i}]`, f);

  note('for...in 遍历对象的键');
  const obj = { a: 1, b: 2 };
  for (const key in obj) show(`key`, key);

  note('while / do-while');
  let n = 3;
  const stack: number[] = [];
  while (n > 0) stack.push(n--);
  show('while 收集', stack);

  note('可辨识联合 + 穷尽 switch（漏分支会编译报错）');
  show('area(circle r=2)', area({ kind: 'circle', r: 2 }).toFixed(2));
  show('area(rect 3x4)', area({ kind: 'rect', w: 3, h: 4 }));

  note('真值陷阱：0 和 "" 都是 falsy，判空要小心');
  const count = 0;
  show('count || "N/A"', count || 'N/A'); // 0 被当假 → 掉进兜底（常见 bug）
  show('count ?? "N/A"', count ?? 'N/A'); // ?? 只在 null/undefined 才兜底 → 保留 0
}
