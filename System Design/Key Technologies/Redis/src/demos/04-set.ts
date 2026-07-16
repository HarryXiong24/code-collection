import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Set —— 无序、去重的集合。SISMEMBER 是 O(1)。
 * 典型用途：标签、去重、UV 统计、"共同好友"这类集合运算。
 */
export async function setDemo(redis: Redis): Promise<void> {
  title('Set：去重与集合运算');

  const a = k('tags', 'post1');
  const b = k('tags', 'post2');
  cmd(`SADD ${a} redis db cache`, await redis.sadd(a, 'redis', 'db', 'cache'));
  note('重复元素直接被忽略，返回值是"真正新增了几个"');
  cmd(`SADD ${a} redis`, await redis.sadd(a, 'redis'));
  cmd(`SADD ${b} redis mq queue`, await redis.sadd(b, 'redis', 'mq', 'queue'));

  cmd(`SMEMBERS ${a}`, await redis.smembers(a));
  cmd(`SISMEMBER ${a} cache`, await redis.sismember(a, 'cache'));
  cmd(`SCARD ${a}`, await redis.scard(a));

  note('交 / 并 / 差都在服务端算完，不用把两个集合拉到客户端');
  cmd(`SINTER ${a} ${b}`, await redis.sinter(a, b));
  cmd(`SUNION ${a} ${b}`, await redis.sunion(a, b));
  cmd(`SDIFF ${a} ${b}`, await redis.sdiff(a, b));

  note('SRANDMEMBER 随机取（不删），SPOP 随机弹出（删）—— 抽奖场景');
  cmd(`SRANDMEMBER ${a} 2`, await redis.srandmember(a, 2));
  cmd(`SPOP ${a}`, await redis.spop(a));

  note('日活去重：一天一个 key，SADD 天然幂等，重复访问不会重复计数');
  const dau = k('dau', '2026-07-15');
  await redis.sadd(dau, 'u1', 'u2', 'u1', 'u3');
  cmd(`SCARD ${dau}`, await redis.scard(dau));
}
