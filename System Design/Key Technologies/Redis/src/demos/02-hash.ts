import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Hash —— key 下面挂一张字段表。
 * 相比"把整个对象 JSON 序列化成 String"，Hash 能只改一个字段、只读一个字段，
 * 不用把整个对象搬来搬去。字段少时底层用 listpack 编码，非常省内存。
 */
export async function hashDemo(redis: Redis): Promise<void> {
  title('Hash：对象存储');

  const key = k('user', '2');
  cmd(`HSET ${key} name Alice age 30 city SH`, await redis.hset(key, { name: 'Alice', age: '30', city: 'SH' }));

  cmd(`HGET ${key} name`, await redis.hget(key, 'name'));
  cmd(`HMGET ${key} name city`, await redis.hmget(key, 'name', 'city'));
  cmd(`HGETALL ${key}`, await redis.hgetall(key));

  note('只改一个字段，不用读出整个对象再写回');
  cmd(`HINCRBY ${key} age 1`, await redis.hincrby(key, 'age', 1));

  cmd(`HEXISTS ${key} email`, await redis.hexists(key, 'email'));
  cmd(`HSETNX ${key} email a@x.com`, await redis.hsetnx(key, 'email', 'a@x.com'));
  cmd(`HSETNX ${key} email b@x.com`, await redis.hsetnx(key, 'email', 'b@x.com'));

  cmd(`HKEYS ${key}`, await redis.hkeys(key));
  cmd(`HLEN ${key}`, await redis.hlen(key));
  cmd(`HDEL ${key} city`, await redis.hdel(key, 'city'));

  note('大 Hash 用 HSCAN 增量遍历，别用 HGETALL 一次拉爆内存');
  const [cursor, flat] = await redis.hscan(key, '0', 'COUNT', 10);
  cmd(`HSCAN ${key} 0`, { cursor, fields: flat.length / 2 });
}
