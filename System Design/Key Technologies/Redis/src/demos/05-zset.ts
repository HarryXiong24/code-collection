import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Sorted Set —— 每个成员带一个 double 分数，按分数有序。
 * 底层是跳表 + 哈希表，插入 O(log N)，按名次/分数范围查都很快。
 * 典型用途：排行榜、延时队列（score = 到期时间戳）、滑动窗口限流。
 */
export async function zsetDemo(redis: Redis): Promise<void> {
  title('ZSet：排行榜 / 延时队列 / 滑动窗口');

  const board = k('rank', 'game');
  cmd(`ZADD ${board} ...`, await redis.zadd(board, 100, 'alice', 250, 'bob', 175, 'carol', 90, 'dave'));

  note('ZREVRANGE 取 Top N（分数从高到低）');
  cmd(`ZREVRANGE ${board} 0 2 WITHSCORES`, await redis.zrevrange(board, 0, 2, 'WITHSCORES'));

  cmd(`ZSCORE ${board} bob`, await redis.zscore(board, 'bob'));
  note('ZREVRANK 从 0 开始，所以显示名次要 +1');
  cmd(`ZREVRANK ${board} carol`, await redis.zrevrank(board, 'carol'));

  note('加分也是原子的，不用先读再写');
  cmd(`ZINCRBY ${board} 60 alice`, await redis.zincrby(board, 60, 'alice'));
  cmd(`ZREVRANGE ${board} 0 -1 WITHSCORES`, await redis.zrevrange(board, 0, -1, 'WITHSCORES'));

  cmd(`ZCOUNT ${board} 100 200`, await redis.zcount(board, 100, 200));
  cmd(`ZRANGEBYSCORE ${board} 100 200`, await redis.zrangebyscore(board, 100, 200));
  cmd(`ZCARD ${board}`, await redis.zcard(board));

  note('延时队列：score 存到期时间戳，轮询捞出所有"已到期"的任务');
  const delayed = k('delayed', 'jobs');
  const now = Date.now();
  await redis.zadd(delayed, now - 1000, 'job-due', now + 60_000, 'job-future');
  const due = await redis.zrangebyscore(delayed, '-inf', now);
  cmd(`ZRANGEBYSCORE ${delayed} -inf ${now}`, due);
  note('真实场景要用 Lua 把"捞出 + 删除"合成一步，否则多个 worker 会抢到同一个任务');
  if (due.length > 0) cmd(`ZREM ${delayed} ${due.join(' ')}`, await redis.zrem(delayed, ...due));

  note('滑动窗口限流：score 存请求时间戳，先清掉窗口外的，再数窗口内还剩几个');
  const win = k('ratelimit', 'u1');
  const windowMs = 1000;
  const limit = 3;
  let allowed = 0;
  for (let i = 0; i < 5; i++) {
    const ts = Date.now();
    await redis.zremrangebyscore(win, 0, ts - windowMs);
    const count = await redis.zcard(win);
    if (count < limit) {
      await redis.zadd(win, ts, `${ts}-${i}`);
      allowed++;
    }
  }
  cmd(`5 次请求，窗口 ${windowMs}ms 限 ${limit} 次 → 放行`, allowed);
}
