import { note, show, sleep, title } from '../log.js';

/**
 * Concurrency & async — JS is single-threaded + event loop, doing concurrent I/O via Promise / async-await.
 * Key points:
 *   1. An async function returns a Promise; await pauses the current function without blocking the thread.
 *   2. Sequential awaits run serially; for concurrency, kick them off together then Promise.all.
 *   3. Promise.allSettled collects every result (doesn't short-circuit on one failure).
 *   4. Promise.race / AbortController do timeouts and cancellation.
 *   5. Single-threaded means no shared-memory races, but a CPU-bound task blocks the event loop.
 */

// simulate an async task: return label after waiting ms milliseconds
async function task(label: string, ms: number): Promise<string> {
  await sleep(ms);
  return `${label}(${ms}ms)`;
}

export async function asyncDemo(): Promise<void> {
  title('08 Concurrency & async');

  note('serial: one await finishes before the next, total time = the sum');
  let t = Date.now();
  const a = await task('A', 30);
  const b = await task('B', 30);
  show('serial result', [a, b]);
  show('serial time (ms)', Date.now() - t);

  note('concurrent: kick off together, then Promise.all to wait, total time ≈ the slowest one');
  t = Date.now();
  const [c, d] = await Promise.all([task('C', 30), task('D', 30)]);
  show('concurrent result', [c, d]);
  show('concurrent time (ms)', Date.now() - t);

  note('allSettled: collects results whether they succeed or fail, no short-circuit');
  const results = await Promise.allSettled([task('ok', 10), Promise.reject(new Error('bad'))]);
  show(
    'allSettled',
    results.map((r) => (r.status === 'fulfilled' ? r.value : `rejected:${(r.reason as Error).message}`)),
  );

  note('timeout control: race pits the "task" against a "timer"');
  const withTimeout = <T>(p: Promise<T>, ms: number): Promise<T> =>
    Promise.race([p, sleep(ms).then(() => Promise.reject(new Error('timeout')))]) as Promise<T>;
  try {
    await withTimeout(task('slow', 100), 20);
  } catch (e) {
    show('race timeout', (e as Error).message);
  }

  note('AbortController: cancel proactively (both fetch and event listeners support it)');
  const ctrl = new AbortController();
  ctrl.abort();
  show('signal.aborted', ctrl.signal.aborted);
}
