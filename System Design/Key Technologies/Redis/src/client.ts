import Redis, { type RedisOptions } from 'ioredis';
import { resolveConfig } from './config.js';

/**
 * 一个连接只能干一件事：一旦 subscribe，这条连接就进入订阅模式，
 * 除了订阅相关命令什么都不能发。所以 pub/sub demo 需要单独 createClient()，
 * 不能复用主连接。
 */
export function createClient(options: RedisOptions = {}): Redis {
  const c = resolveConfig();

  const base: RedisOptions = {
    // 连不上时最多重试 3 次，避免 demo 卡在无限重连里。
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => (times > 3 ? null : Math.min(times * 200, 1000)),
    lazyConnect: true,
    ...options,
  };

  if (c.url) return new Redis(c.url, base);

  return new Redis({
    host: c.host,
    port: c.port,
    username: c.username,
    password: c.password,
    db: c.db,
    ...base,
  });
}

/** demo 里所有 key 都带前缀，跑完能一把清干净，也不会污染你现有的数据。 */
export const NS = 'demo';
export const k = (...parts: string[]): string => [NS, ...parts].join(':');

/** 按前缀清理，用 SCAN 而不是 KEYS —— KEYS 会阻塞整个 Redis。 */
export async function cleanup(redis: Redis): Promise<number> {
  let cursor = '0';
  let removed = 0;
  do {
    const [next, keys] = await redis.scan(cursor, 'MATCH', `${NS}:*`, 'COUNT', 100);
    cursor = next;
    if (keys.length > 0) removed += await redis.del(...keys);
  } while (cursor !== '0');
  return removed;
}
