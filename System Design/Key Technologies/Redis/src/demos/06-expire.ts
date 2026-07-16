import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, sleep, title } from '../log.js';

/**
 * 过期与淘汰。
 *
 * 两个容易混淆的点：
 *   1. 过期是"惰性删除 + 后台采样删除"，不是到点就立刻从内存消失。
 *   2. 对 key 做 SET（覆盖写）会清掉 TTL；HSET 这类改字段的命令不会。
 */
export async function expireDemo(redis: Redis): Promise<void> {
  title('过期：TTL / EXPIRE / PERSIST');

  const key = k('session', 'abc');
  cmd(`SET ${key} token EX 100`, await redis.set(key, 'token', 'EX', 100));
  cmd(`TTL ${key}`, await redis.ttl(key));

  note('TTL 返回 -1 = 存在但没设过期；-2 = key 不存在');
  const forever = k('forever');
  await redis.set(forever, 'v');
  cmd(`TTL ${forever}`, await redis.ttl(forever));
  cmd(`TTL ${k('ghost')}`, await redis.ttl(k('ghost')));

  cmd(`EXPIRE ${key} 200`, await redis.expire(key, 200));
  cmd(`TTL ${key}`, await redis.ttl(key));
  cmd(`PERSIST ${key}`, await redis.persist(key));
  cmd(`TTL ${key} (PERSIST 后)`, await redis.ttl(key));

  note('坑：SET 覆盖写会把 TTL 冲掉。想保留得用 KEEPTTL');
  const t = k('ttl', 'reset');
  await redis.set(t, 'v1', 'EX', 100);
  await redis.set(t, 'v2');
  cmd(`SET 覆盖后 TTL`, await redis.ttl(t));
  await redis.set(t, 'v3', 'EX', 100);
  await redis.set(t, 'v4', 'KEEPTTL');
  cmd(`SET ... KEEPTTL 后 TTL`, await redis.ttl(t));

  note('真的等它过期一次');
  const short = k('short', 'lived');
  await redis.set(short, 'bye', 'PX', 300);
  cmd(`GET ${short} (立刻)`, await redis.get(short));
  await sleep(400);
  cmd(`GET ${short} (400ms 后)`, await redis.get(short));

  note('缓存雪崩：大批 key 同一秒过期会把请求全打到数据库。TTL 上加随机抖动');
  const base = 300;
  for (let i = 0; i < 3; i++) {
    const jittered = base + Math.floor(Math.random() * 60);
    await redis.set(k('jitter', String(i)), 'v', 'EX', jittered);
    cmd(`SET ${k('jitter', String(i))} EX ${jittered}`, `${base} + 随机抖动`);
  }
}
