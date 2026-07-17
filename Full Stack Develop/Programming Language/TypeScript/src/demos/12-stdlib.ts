import { note, show, title } from '../log.js';

/**
 * 标准库常用惯例 —— JSON、日期、字符串、数字、数组高频操作。
 * 要点：
 *   1. JSON.stringify / parse 做序列化，注意 Date 会变字符串。
 *   2. 日期用内置 Date；复杂时区/格式化生产里常上第三方库。
 *   3. 字符串是不可变的，方法都返回新串。
 *   4. Intl.* 做本地化格式化（货币、数字、日期）。
 *   5. 数组的 map/filter/reduce/some/every/flatMap 是日常主力。
 */
export function stdlibDemo(): void {
  title('12 标准库常用惯例');

  note('JSON：对象 ↔ 字符串');
  const user = { id: 1, name: 'Harry', roles: ['dev', 'admin'] };
  const json = JSON.stringify(user);
  show('JSON.stringify', json);
  show('JSON.parse(...).roles', (JSON.parse(json) as typeof user).roles);
  show('带缩进', JSON.stringify({ a: 1 }, null, 2).replace(/\n/g, '\\n'));

  note('日期：ISO 字符串、时间戳、加减');
  const d = new Date('2026-07-16T08:00:00Z');
  show('toISOString', d.toISOString());
  show('getTime()（毫秒时间戳）', d.getTime());
  const tomorrow = new Date(d.getTime() + 24 * 3600 * 1000);
  show('+1 天', tomorrow.toISOString().slice(0, 10));

  note('字符串：不可变，方法返回新串');
  const s = '  Hello, TypeScript  ';
  show('trim()', s.trim());
  show('toUpperCase()', s.trim().toUpperCase());
  show('split(",")', 'a,b,c'.split(','));
  show('replaceAll', 'a-b-c'.replaceAll('-', '_'));
  show('padStart', '7'.padStart(3, '0'));
  show('includes', 'typescript'.includes('script'));

  note('数字格式化：toFixed 与 Intl（货币/千分位）');
  show('(1234.5).toFixed(2)', (1234.5).toFixed(2));
  show('货币', new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(19999.9));

  note('数组进阶：flatMap / some / every / Array.from');
  show('flatMap', [1, 2, 3].flatMap((n) => [n, n * 10]));
  show('some > 2', [1, 2, 3].some((n) => n > 2));
  show('every > 0', [1, 2, 3].every((n) => n > 0));
  show('Array.from({length:3})', Array.from({ length: 3 }, (_, i) => i * i));

  note('Object 工具：entries / fromEntries 做「字典 ↔ 数组」互转');
  const doubled = Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2]));
  show('fromEntries(map)', doubled);
}
