import { note, show, title } from '../log.js';

/**
 * 错误处理 —— TS 的模型是「抛异常 + try/catch/finally」。
 * 要点：
 *   1. throw 任意值，但应 throw Error（或其子类）以带上堆栈。
 *   2. catch 到的变量类型是 unknown，用前要先收窄。
 *   3. 自定义错误类 extends Error，便于按类型分派。
 *   4. finally 总会执行，常用于释放资源。
 *   5. 想「不用异常表达失败」时，可仿 Go/Rust 返回 Result 联合类型。
 */

// 自定义错误：带上业务字段
class ValidationError extends Error {
  constructor(
    public readonly field: string,
    message: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

function parseAge(input: string): number {
  const n = Number(input);
  if (Number.isNaN(n)) throw new ValidationError('age', `"${input}" 不是数字`);
  if (n < 0) throw new ValidationError('age', '年龄不能为负');
  return n;
}

// Result 风格：把失败编码进返回值，而不是抛出（调用方必须处理）
type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

function safeDivide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: 'division by zero' };
  return { ok: true, value: a / b };
}

export function errorHandlingDemo(): void {
  title('07 错误处理');

  note('try/catch：catch 变量是 unknown，先用 instanceof 收窄');
  try {
    parseAge('abc');
  } catch (e) {
    if (e instanceof ValidationError) show(`捕获 ${e.name}`, `${e.field}: ${e.message}`);
    else throw e; // 不是我们认识的错误，继续往上抛
  }

  note('finally 总会执行，用于收尾');
  const trace: string[] = [];
  try {
    trace.push('try');
    throw new Error('boom');
  } catch {
    trace.push('catch');
  } finally {
    trace.push('finally');
  }
  show('执行顺序', trace);

  note('Result 风格：不抛异常，用返回值表达成功/失败');
  const r1 = safeDivide(10, 2);
  const r2 = safeDivide(1, 0);
  show('safeDivide(10, 2)', r1.ok ? r1.value : `err: ${r1.error}`);
  show('safeDivide(1, 0)', r2.ok ? r2.value : `err: ${r2.error}`);

  note('异步错误同样用 try/catch 包住 await');
  Promise.reject(new Error('async fail')).catch((e) => show('rejected', (e as Error).message));
}
