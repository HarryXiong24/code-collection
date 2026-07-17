import { note, show, title } from '../log.js';

/**
 * 自定义排序与相等性 —— 按自己的规则排序，定义自己类型的「相等」。
 * 要点：
 *   1. Array.sort 接收比较器 (a, b) => number：负数 a 在前、正数 b 在前、0 不变。
 *   2. sort 是原地修改且（ES2019 起）稳定，想保留原数组先 [...arr] 拷贝。
 *   3. 多键排序 = 比较器串联：前一个返回 0 才看下一个。
 *   4. 对象没有运算符重载，=== 比较的是引用，不是内容。
 *   5. 想「按值去重/查找」得自己造一个 key（字符串或元组），再用 Map/Set。
 */

interface Person {
  name: string;
  dept: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', dept: 'eng', age: 30 },
  { name: 'Bob', dept: 'sales', age: 25 },
  { name: 'Carol', dept: 'eng', age: 25 },
  { name: 'Dave', dept: 'sales', age: 40 },
];

// 比较器组合子：把「取键、降序、再比」拆成可复用的小工具
type Cmp<T> = (a: T, b: T) => number;
const by =
  <T, K extends number | string>(key: (x: T) => K): Cmp<T> =>
  (a, b) =>
    key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
const desc =
  <T>(cmp: Cmp<T>): Cmp<T> =>
  (a, b) =>
    -cmp(a, b);
const thenBy =
  <T>(first: Cmp<T>, second: Cmp<T>): Cmp<T> =>
  (a, b) =>
    first(a, b) || second(a, b); // 0 是 falsy，才继续比下一个键

const names = (ps: Person[]): string[] => ps.map((p) => p.name);

export function sortingEqualityDemo(): void {
  title('15 自定义排序与相等性');

  note('单键排序：比较器 (a,b)=>a.age-b.age（拷贝后再排，不动原数组）');
  show('按 age 升序', names([...people].sort(by((p) => p.age))));

  note('多键排序：dept 升序，同 dept 再按 age 降序');
  show('dept↑ 再 age↓', names([...people].sort(thenBy(by((p) => p.dept), desc(by((p) => p.age))))));

  note('字符串按语言习惯排序用 localeCompare');
  show('按 name 排序', names([...people].sort((a, b) => a.name.localeCompare(b.name))));

  note('稳定性：只按 dept 排，同组内保持原始相对顺序（Alice 在 Carol 前）');
  show('稳定排序', names([...people].sort(by((p) => p.dept))));

  note('相等性：=== 比较引用，内容相同的两个对象并不相等');
  const a: Person = { name: 'Alice', dept: 'eng', age: 30 };
  const b: Person = { name: 'Alice', dept: 'eng', age: 30 };
  show('a === b（引用不同）', a === b);

  note('要按值判等/去重，自己造 key 再用 Set/Map');
  const keyOf = (p: Person): string => `${p.name}|${p.dept}|${p.age}`;
  const seen = new Map(people.concat(a).map((p) => [keyOf(p), p]));
  show('keyOf(a) === keyOf(b)', keyOf(a) === keyOf(b));
  show('按 key 去重后数量', seen.size); // a 与已有 Alice 同 key → 不新增
}
