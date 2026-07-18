import { note, show, title } from '../log.js';

/**
 * Error handling — TS's model is "throw exceptions + try/catch/finally".
 * Key points:
 *   1. You can throw any value, but you should throw Error (or a subclass) to carry a stack.
 *   2. A caught variable has type unknown; narrow it before use.
 *   3. Custom error classes extend Error, making it easy to dispatch by type.
 *   4. finally always runs, commonly used to release resources.
 *   5. When you want to "express failure without exceptions", you can mimic Go/Rust with a Result union type.
 */

// custom error: carries a business field
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
  if (Number.isNaN(n)) throw new ValidationError('age', `"${input}" is not a number`);
  if (n < 0) throw new ValidationError('age', 'age cannot be negative');
  return n;
}

// Result style: encode failure into the return value instead of throwing (the caller must handle it)
type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

function safeDivide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: 'division by zero' };
  return { ok: true, value: a / b };
}

export function errorHandlingDemo(): void {
  title('07 Error handling');

  note('try/catch: the catch variable is unknown, narrow it with instanceof first');
  try {
    parseAge('abc');
  } catch (e) {
    if (e instanceof ValidationError) show(`caught ${e.name}`, `${e.field}: ${e.message}`);
    else throw e; // not an error we recognize, rethrow upward
  }

  note('finally always runs, used for cleanup');
  const trace: string[] = [];
  try {
    trace.push('try');
    throw new Error('boom');
  } catch {
    trace.push('catch');
  } finally {
    trace.push('finally');
  }
  show('execution order', trace);

  note('Result style: no throwing, express success/failure via the return value');
  const r1 = safeDivide(10, 2);
  const r2 = safeDivide(1, 0);
  show('safeDivide(10, 2)', r1.ok ? r1.value : `err: ${r1.error}`);
  show('safeDivide(1, 0)', r2.ok ? r2.value : `err: ${r2.error}`);

  note('async errors are likewise wrapped by try/catch around await');
  Promise.reject(new Error('async fail')).catch((e) => show('rejected', (e as Error).message));
}
