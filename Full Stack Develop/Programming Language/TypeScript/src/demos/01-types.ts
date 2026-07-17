import { note, show, title } from '../log.js';

/**
 * 类型与变量 —— TypeScript = JavaScript + 静态类型。
 * 要点：
 *   1. let / const 声明，const 不可重新赋值（但对象内部仍可变）。
 *   2. 原始类型：string / number / boolean / bigint / symbol / null / undefined。
 *   3. 类型标注 `: T` 是可选的，编译器大多能自动推断。
 *   4. number 只有一种（IEEE-754 双精度），整数大数用 bigint。
 *   5. 编译期检查，运行时被擦除 —— 类型不参与运行。
 */
export function typesDemo(): void {
  title('01 类型与变量');

  note('const 推断为字面量类型 "Harry"；let 推断为更宽的 string');
  const name = 'Harry'; // 类型: "Harry"
  let city = 'Shenzhen'; // 类型: string
  city = 'Beijing';
  show('typeof name', typeof name);
  show('name / city', [name, city]);

  note('显式标注：当推断不了或想更严格时才写');
  const age: number = 30;
  const price = 9.99; // number 不分 int/float
  const isVip: boolean = true;
  show('age / price / isVip', [age, price, isVip]);

  note('大整数用 bigint，字面量以 n 结尾，不能和 number 直接混算');
  const big = 9007199254740993n; // 超过 Number.MAX_SAFE_INTEGER 仍精确
  show('big + 1n', big + 1n);
  show('Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER);

  note('null 与 undefined 是两个不同的空值；strict 下不能随便赋给别的类型');
  const maybe: string | undefined = undefined;
  const empty: string | null = null;
  show('maybe ?? "default"', maybe ?? 'default'); // ?? 只在 null/undefined 时兜底
  show('empty ?? "fallback"', empty ?? 'fallback');

  note('模板字符串与类型转换');
  const n = 42;
  show('`value=${n}`', `value=${n}`);
  show('Number("3.14")', Number('3.14'));
  show('String(true)', String(true));
  show('parseInt("08px", 10)', parseInt('08px', 10));

  note('as const：把值锁成只读字面量，常用于配置');
  const config = { env: 'prod', retries: 3 } as const; // 所有字段变 readonly
  show('config', config);

  note('typeof / instanceof 是运行期的类型判断');
  show('typeof 42', typeof 42);
  show('typeof []', typeof []);
  show('[] instanceof Array', [] instanceof Array);
}
