import { note, show, title } from '../log.js';

/**
 * 集合类型 —— 数组 / 元组 / 对象记录 / Map / Set。
 * 要点：
 *   1. 数组 T[]（或 Array<T>）是同质、可变长。
 *   2. 元组 [A, B] 定长、每位类型固定。
 *   3. 对象当字典时优先用 Record<K, V> 或 Map。
 *   4. Map 保留插入顺序、键可为任意类型；Set 去重。
 *   5. 展开 ... 与解构是日常主力语法。
 */
export function collectionsDemo(): void {
  title('02 集合类型');

  note('数组：同质、可变长，函数式方法链是惯用法');
  const nums: number[] = [3, 1, 4, 1, 5, 9];
  show('nums.map(x=>x*2)', nums.map((x) => x * 2));
  show('nums.filter(x=>x>3)', nums.filter((x) => x > 3));
  show('nums.reduce(sum)', nums.reduce((a, b) => a + b, 0));
  show('[...nums].sort((a,b)=>a-b)', [...nums].sort((a, b) => a - b)); // 拷贝再排，别原地改

  note('元组：定长、每位类型不同，常用于「返回多个值」');
  const point: [number, number] = [10, 20];
  const [x, y] = point;
  show('[x, y]', [x, y]);
  const pair: [string, number] = ['age', 30];
  show('pair', pair);

  note('对象做字典：键值类型固定用 Record<K, V>');
  const scores: Record<string, number> = { alice: 95, bob: 82 };
  scores.carol = 78;
  show('Object.entries(scores)', Object.entries(scores));
  show('"alice" in scores', 'alice' in scores);

  note('Map：键可为任意类型、保留插入顺序、有 .size');
  const m = new Map<string, number>([
    ['a', 1],
    ['b', 2],
  ]);
  m.set('c', 3);
  show('m.get("b")', m.get('b'));
  show('m.has("z")', m.has('z'));
  show('[...m.keys()]', [...m.keys()]);
  show('m.size', m.size);

  note('Set：自动去重，交并差用展开配合');
  const s = new Set([1, 2, 2, 3, 3, 3]);
  show('new Set([1,2,2,3,3,3])', s);
  const other = new Set([2, 3, 4]);
  show('交集', [...s].filter((v) => other.has(v)));
  show('并集', new Set([...s, ...other]));

  note('解构 + 展开：合并对象、提取剩余');
  const base = { host: 'localhost', port: 80 };
  const merged = { ...base, port: 443, tls: true }; // 后者覆盖前者
  show('merged', merged);
  const [first, ...rest] = nums;
  show('first / rest', [first, rest]);
}
