import { randomUUID } from 'node:crypto';
import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title, warn } from '../log.js';

/**
 * Lua 脚本 + 分布式锁。
 *
 * Lua 脚本在 Redis 里是原子执行的：单线程模型下，脚本跑完之前不会插进别的命令。
 * 这正是"读一下再决定改不改"这类逻辑需要的东西 —— 用两条命令做不到。
 *
 * 锁的三个关键点：
 *   1. SET NX 保证只有一个人拿到锁。
 *   2. EX 兜底：持有者崩了，锁也会自己过期，不会永久死锁。
 *   3. 释放时用 Lua 校验 owner：不能删掉别人的锁。
 */

/** 只有 value 匹配（说明锁还是我的）才删。 */
const UNLOCK_LUA = `
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("DEL", KEYS[1])
else
  return 0
end
`;

/** 续期同理：确认还是自己的锁，才延长 TTL。 */
const RENEW_LUA = `
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("PEXPIRE", KEYS[1], ARGV[2])
else
  return 0
end
`;

class RedisLock {
  private readonly token = randomUUID();

  constructor(
    private readonly redis: Redis,
    private readonly key: string,
    private readonly ttlMs = 10_000,
  ) {}

  async acquire(): Promise<boolean> {
    const ok = await this.redis.set(this.key, this.token, 'PX', this.ttlMs, 'NX');
    return ok === 'OK';
  }

  async release(): Promise<boolean> {
    const n = await this.redis.eval(UNLOCK_LUA, 1, this.key, this.token);
    return n === 1;
  }

  async renew(): Promise<boolean> {
    const n = await this.redis.eval(RENEW_LUA, 1, this.key, this.token, String(this.ttlMs));
    return n === 1;
  }
}

export async function luaLockDemo(redis: Redis): Promise<void> {
  title('Lua 脚本与分布式锁');

  note('EVAL：KEYS 传 key，ARGV 传参数。分开是为了让 Redis Cluster 知道要路由到哪个槽');
  cmd(`EVAL "return {KEYS[1], ARGV[1]}" 1 foo bar`, await redis.eval('return {KEYS[1], ARGV[1]}', 1, 'foo', 'bar'));

  note('脚本里可以做"检查再决定"，两条独立命令做不到这点');
  const counter = k('lua', 'counter');
  const INCR_IF_BELOW = `
    local v = tonumber(redis.call("GET", KEYS[1]) or "0")
    if v < tonumber(ARGV[1]) then
      return redis.call("INCR", KEYS[1])
    end
    return -1
  `;
  await redis.set(counter, '2');
  cmd('INCR 但上限为 3 → 2 变 3', await redis.eval(INCR_IF_BELOW, 1, counter, '3'));
  cmd('再来一次 → 已到上限，拒绝', await redis.eval(INCR_IF_BELOW, 1, counter, '3'));

  const lockKey = k('lock', 'order', '1001');

  note('两个客户端抢同一把锁');
  const a = new RedisLock(redis, lockKey, 5000);
  const b = new RedisLock(redis, lockKey, 5000);
  cmd('A 抢锁', await a.acquire());
  cmd('B 抢锁', await b.acquire());

  cmd('A 续期', await a.renew());
  warn('B 想解锁 A 持有的锁 → Lua 校验 owner，删不掉');
  cmd('B 解锁', await b.release());
  cmd('A 解锁', await a.release());
  cmd('锁释放后 B 再抢', await b.acquire());
  await b.release();

  note('SCRIPT LOAD + EVALSHA：脚本只传一次，之后发 40 字节的 sha 就行');
  const sha = await redis.script('LOAD', UNLOCK_LUA);
  cmd('SCRIPT LOAD → sha', sha);
  cmd('EVALSHA (锁已释放，返回 0)', await redis.evalsha(String(sha), 1, lockKey, 'whatever'));

  warn('生产环境注意：这是单实例锁。主从切换时锁可能丢失（主没来得及同步就挂了）');
  note('对正确性要求极高的场景要么用 Redlock，要么就别拿 Redis 当唯一的正确性保证');
}
