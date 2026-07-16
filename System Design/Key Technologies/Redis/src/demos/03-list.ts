import type Redis from 'ioredis';
import { createClient, k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * List —— 双端链表（quicklist）。两端 push/pop 都是 O(1)，中间随机访问是 O(N)。
 * 典型用途：消息队列、最近 N 条记录、栈。
 */
export async function listDemo(redis: Redis): Promise<void> {
  title('List：队列 / 栈 / 阻塞消费');

  const key = k('queue', 'tasks');
  cmd(`RPUSH ${key} t1 t2 t3`, await redis.rpush(key, 't1', 't2', 't3'));
  cmd(`LPUSH ${key} t0`, await redis.lpush(key, 't0'));
  cmd(`LRANGE ${key} 0 -1`, await redis.lrange(key, 0, -1));

  note('左进右出 = FIFO 队列；左进左出 = LIFO 栈');
  cmd(`LPOP ${key}`, await redis.lpop(key));
  cmd(`RPOP ${key}`, await redis.rpop(key));
  cmd(`LLEN ${key}`, await redis.llen(key));

  note('LTRIM 保留最近 N 条 —— 定长时间线的常见写法');
  const feed = k('feed', 'recent');
  await redis.rpush(feed, ...Array.from({ length: 10 }, (_, i) => `msg${i}`));
  await redis.ltrim(feed, -3, -1);
  cmd(`LTRIM ${feed} -3 -1; LRANGE`, await redis.lrange(feed, 0, -1));

  note('BLPOP 阻塞等待，队列空时不用轮询。它会占住连接，所以另开一条');
  const consumer = createClient();
  const waiting = consumer.blpop(key, 5); // 最多等 5 秒
  await redis.rpush(key, 'urgent-job');
  const got = await waiting;
  cmd(`BLPOP ${key} 5`, got);
  await consumer.quit();

  note('LMOVE 原子地"取出并转移"，配合 processing 列表可做可靠队列：崩溃了任务还在');
  const src = k('rq', 'pending');
  const processing = k('rq', 'processing');
  await redis.rpush(src, 'job-A');
  cmd(`LMOVE ${src} ${processing} LEFT RIGHT`, await redis.lmove(src, processing, 'LEFT', 'RIGHT'));
  cmd(`LRANGE ${processing} 0 -1`, await redis.lrange(processing, 0, -1));
  note('处理成功后再 LREM 把它从 processing 删掉，才算真正确认');
  cmd(`LREM ${processing} 1 job-A`, await redis.lrem(processing, 1, 'job-A'));
}
