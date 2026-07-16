import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * String —— 最基础的类型，值就是一段二进制安全的字节，最大 512MB。
 * 典型用途：缓存对象、计数器、分布式锁的锁标记。
 */
export async function stringDemo(redis: Redis): Promise<void> {
  title('String：SET / GET / INCR / 缓存');

  const key = k('user', '1', 'name');
  cmd(`SET ${key} "Harry"`, await redis.set(key, 'Harry'));
  cmd(`GET ${key}`, await redis.get(key));
  cmd(`GET ${k('nope')}`, await redis.get(k('nope')));

  note('INCR 是原子的，读-改-写在服务端一步完成，天然免竞态');
  const views = k('post', '42', 'views');
  cmd(`INCR ${views}`, await redis.incr(views));
  cmd(`INCR ${views}`, await redis.incr(views));
  cmd(`INCRBY ${views} 10`, await redis.incrby(views, 10));
  cmd(`GET ${views}`, await redis.get(views));

  note('SET NX：只在不存在时写入，返回 nil 表示别人先写了 —— 分布式锁的基础');
  const lock = k('lock', 'demo');
  cmd(`SET ${lock} A NX EX 30`, await redis.set(lock, 'A', 'EX', 30, 'NX'));
  cmd(`SET ${lock} B NX EX 30`, await redis.set(lock, 'B', 'EX', 30, 'NX'));

  note('MSET / MGET：一次往返读写多个 key，省 RTT');
  await redis.mset(k('cfg', 'a'), '1', k('cfg', 'b'), '2');
  cmd(`MGET ${k('cfg', 'a')} ${k('cfg', 'b')}`, await redis.mget(k('cfg', 'a'), k('cfg', 'b')));

  note('Cache-Aside：先查缓存，未命中再回源，回源后写回并设 TTL');
  const cacheKey = k('cache', 'user', '1');
  for (const round of [1, 2]) {
    const hit = await redis.get(cacheKey);
    if (hit !== null) {
      cmd(`第 ${round} 次读 → 命中`, JSON.parse(hit));
      continue;
    }
    const fromDb = { id: 1, name: 'Harry', role: 'dev' };
    await redis.set(cacheKey, JSON.stringify(fromDb), 'EX', 60);
    cmd(`第 ${round} 次读 → 未命中，回源并写回`, fromDb);
  }
}
