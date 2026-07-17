import { note, show, sleep, title } from '../log.js';

/**
 * 并发与异步 —— JS 是单线程 + 事件循环，靠 Promise / async-await 做并发 I/O。
 * 要点：
 *   1. async 函数返回 Promise；await 暂停当前函数、不阻塞线程。
 *   2. 顺序 await 会串行；要并发就一起发起再 Promise.all。
 *   3. Promise.allSettled 收集全部结果（不因一个失败而短路）。
 *   4. Promise.race / AbortController 做超时与取消。
 *   5. 单线程意味着没有共享内存竞态，但 CPU 密集任务会卡住事件循环。
 */

// 模拟一个异步任务：等 ms 毫秒后返回 label
async function task(label: string, ms: number): Promise<string> {
  await sleep(ms);
  return `${label}(${ms}ms)`;
}

export async function asyncDemo(): Promise<void> {
  title('08 并发与异步');

  note('串行：一个 await 完再下一个，总耗时 = 相加');
  let t = Date.now();
  const a = await task('A', 30);
  const b = await task('B', 30);
  show('串行结果', [a, b]);
  show('串行耗时(ms)', Date.now() - t);

  note('并发：先一起发起，再 Promise.all 等，总耗时 ≈ 最慢那个');
  t = Date.now();
  const [c, d] = await Promise.all([task('C', 30), task('D', 30)]);
  show('并发结果', [c, d]);
  show('并发耗时(ms)', Date.now() - t);

  note('allSettled：无论成功失败都收集，不短路');
  const results = await Promise.allSettled([task('ok', 10), Promise.reject(new Error('bad'))]);
  show(
    'allSettled',
    results.map((r) => (r.status === 'fulfilled' ? r.value : `rejected:${(r.reason as Error).message}`)),
  );

  note('超时控制：race 让「任务」和「定时器」赛跑');
  const withTimeout = <T>(p: Promise<T>, ms: number): Promise<T> =>
    Promise.race([p, sleep(ms).then(() => Promise.reject(new Error('timeout')))]) as Promise<T>;
  try {
    await withTimeout(task('slow', 100), 20);
  } catch (e) {
    show('race 超时', (e as Error).message);
  }

  note('AbortController：主动取消（fetch、事件监听都支持）');
  const ctrl = new AbortController();
  ctrl.abort();
  show('signal.aborted', ctrl.signal.aborted);
}
