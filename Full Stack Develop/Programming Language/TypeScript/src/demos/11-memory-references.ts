import { note, show, title } from '../log.js';

/**
 * 内存 / 引用 / 拷贝 —— JS 没有裸指针，但「引用 vs 值」的坑处处都在。
 * 要点：
 *   1. 原始值（number/string/boolean…）按值复制；对象/数组/函数按引用复制。
 *   2. 赋值和传参传的是「引用的拷贝」，改内部会互相影响。
 *   3. 浅拷贝 {...o} / [...a] 只复制一层；深层仍共享。
 *   4. 深拷贝用 structuredClone()（现代运行时内置）。
 *   5. === 比较对象是「同一个引用吗」，不是「内容一样吗」。
 */
export function memoryReferencesDemo(): void {
  title('11 内存 / 引用 / 拷贝');

  note('原始值按值复制：改副本不影响原值');
  let a = 10;
  let b = a;
  b += 5;
  show('a / b', [a, b]);

  note('对象按引用复制：两个变量指向同一块内存');
  const o1 = { count: 1 };
  const o2 = o1;
  o2.count = 99;
  show('o1.count（被 o2 改到）', o1.count);
  show('o1 === o2', o1 === o2);

  note('=== 比较引用而非内容：内容相同但不是同一个对象 → false');
  show('{x:1} === {x:1}', ({ x: 1 } as object) === ({ x: 1 } as object));

  note('浅拷贝只复制一层：嵌套对象仍共享');
  const original = { name: 'Harry', tags: ['a', 'b'] };
  const shallow = { ...original };
  shallow.tags.push('c'); // 改到的是共享的那个数组
  show('original.tags（被浅拷贝改到）', original.tags);

  note('深拷贝：structuredClone 彻底断开引用');
  const deep = structuredClone(original);
  deep.tags.push('z');
  show('original.tags（深拷贝不影响）', original.tags);
  show('deep.tags', deep.tags);

  note('传参也是传引用拷贝：函数能改对象内部，但重新赋值不影响外部');
  const mutate = (obj: { count: number }): void => {
    obj.count += 1; // 改内部 → 外部可见
  };
  const reassign = (obj: { count: number }): void => {
    obj = { count: -1 }; // 只换了本地引用 → 外部看不到
  };
  const box = { count: 0 };
  mutate(box);
  reassign(box);
  show('box.count', box.count);

  note('冻结：Object.freeze 让对象浅层只读（strict 下改会报错）');
  const frozen = Object.freeze({ pi: 3.14 });
  show('Object.isFrozen', Object.isFrozen(frozen));
}
