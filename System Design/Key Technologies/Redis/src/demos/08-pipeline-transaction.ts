import type Redis from 'ioredis';
import { createClient, k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Pipeline vs Transaction —— 常被混为一谈，其实是两回事：
 *
 *   Pipeline：批量发送，省的是网络往返（RTT），不保证原子性。
 *   MULTI/EXEC：保证这批命令连续执行、中间不插入别人的命令，但没有回滚。
 *
 * ioredis 里 .pipeline() 是前者，.multi() 是后者。
 */
export async function pipelineDemo(redis: Redis): Promise<void> {
  title('Pipeline / 事务 / WATCH');

  note('Pipeline：100 条命令 1 次往返，对比逐条发送');
  const N = 100;

  const t1 = Date.now();
  for (let i = 0; i < N; i++) await redis.set(k('p', 'seq', String(i)), String(i));
  const seqMs = Date.now() - t1;

  const t2 = Date.now();
  const pipe = redis.pipeline();
  for (let i = 0; i < N; i++) pipe.set(k('p', 'pipe', String(i)), String(i));
  await pipe.exec();
  const pipeMs = Date.now() - t2;

  cmd(`逐条 ${N} 次 SET`, `${seqMs}ms`);
  cmd(`Pipeline ${N} 次 SET`, `${pipeMs}ms`);

  note('MULTI/EXEC：命令先入队，EXEC 时一次性连续执行');
  const acct = k('acct', 'x');
  await redis.set(acct, '100');
  const results = await redis.multi().decrby(acct, 30).incrby(k('acct', 'y'), 30).get(acct).exec();
  cmd(
    'MULTI ... EXEC',
    results?.map(([err, val]) => (err ? `ERR ${err.message}` : val)),
  );

  note('坑：Redis 事务没有回滚。某条命令运行时出错，其余命令照样生效');
  await redis.set(k('tx', 'str'), 'not-a-number');
  const mixed = await redis.multi().incr(k('tx', 'str')).set(k('tx', 'ok'), 'written').exec();
  cmd('INCR 一个字符串 → 报错', mixed?.[0]?.[0]?.message ?? null);
  cmd('但后面那条 SET 仍然写进去了', await redis.get(k('tx', 'ok')));

  note('WATCH：乐观锁。被 watch 的 key 在 EXEC 前被改过，EXEC 返回 nil');
  const stock = k('stock', 'item');
  await redis.set(stock, '5');

  const watcher = createClient();
  await watcher.watch(stock);
  const current = Number(await watcher.get(stock));

  // 模拟另一个客户端在这个空档抢先改了库存。
  await redis.set(stock, '3');

  const txn = await watcher
    .multi()
    .set(stock, String(current - 1))
    .exec();
  cmd('EXEC (期间 key 被别人改了)', txn);
  note('返回 nil = 事务被打断，正确做法是重新读一遍再重试');
  cmd(`GET ${stock} (没被覆盖)`, await redis.get(stock));
  await watcher.quit();
}
