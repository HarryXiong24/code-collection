import type Redis from 'ioredis';
import { k } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Stream —— Redis 5 引入的 append-only 日志，Pub/Sub 的持久化替代品。
 *
 * 和 Pub/Sub 的区别：消息会留在 stream 里，消费者可以从任意位置重放；
 * 消费组（Consumer Group）让一组消费者分摊消息，每条只被组内一个成员处理，
 * 处理完要 XACK 确认，没确认的会留在 pending 列表里，可以被别人接管。
 * 心智模型上基本就是一个迷你 Kafka。
 */
export async function streamDemo(redis: Redis): Promise<void> {
  title('Stream：持久化消息 / 消费组');

  const stream = k('stream', 'events');
  const group = 'workers';

  note('XADD 追加，* 表示让 Redis 自动生成 ID（毫秒时间戳-序号）');
  const id1 = await redis.xadd(stream, '*', 'type', 'signup', 'user', 'u1');
  const id2 = await redis.xadd(stream, '*', 'type', 'purchase', 'user', 'u2', 'amount', '99');
  cmd('XADD → id', id1);
  cmd('XADD → id', id2);
  cmd(`XLEN ${stream}`, await redis.xlen(stream));

  note('XRANGE 按 ID 区间读，- 和 + 表示最小/最大');
  const all = await redis.xrange(stream, '-', '+');
  cmd(
    'XRANGE - +',
    all.map(([id, fields]) => ({ id, fields })),
  );

  note('建消费组。$ = 只收新消息，0 = 从头开始收');
  try {
    await redis.xgroup('CREATE', stream, group, '0', 'MKSTREAM');
    cmd(`XGROUP CREATE ${group}`, 'OK');
  } catch (e) {
    // 组已存在会报 BUSYGROUP，重复跑 demo 时是正常的。
    cmd(`XGROUP CREATE ${group}`, (e as Error).message.split(' ')[0]);
  }

  note('> 表示"只给我这个组还没投递过的消息"');
  // ioredis 对这两个命令的返回类型标得很松，只能自己断言成实际结构。
  type Entry = [id: string, fields: string[]];
  const read = (await redis.xreadgroup('GROUP', group, 'worker-1', 'COUNT', 10, 'STREAMS', stream, '>')) as
    [stream: string, entries: Entry[]][] | null;
  const entries: Entry[] = read?.[0]?.[1] ?? [];
  cmd('XREADGROUP worker-1 收到', entries.length);
  for (const [id, fields] of entries) cmd(`  ${id}`, fields);

  note('读了但没 XACK 的消息躺在 pending 里 —— 消费者崩了也不会丢');
  const pending = await redis.xpending(stream, group);
  cmd('XPENDING', pending);

  const firstId = entries[0]?.[0];
  if (firstId !== undefined) {
    cmd(`XACK ${firstId}`, await redis.xack(stream, group, firstId));
    cmd('XACK 后剩余 pending', (await redis.xpending(stream, group))?.[0]);
  }

  note('XAUTOCLAIM：把闲置超时的 pending 消息转给别的消费者接手');
  const [nextCursor, claimed] = (await redis.xautoclaim(stream, group, 'worker-2', 0, '0')) as [
    cursor: string,
    entries: Entry[],
  ];
  cmd('XAUTOCLAIM → worker-2 接管', { cursor: nextCursor, count: claimed.length });
  for (const [id] of claimed) await redis.xack(stream, group, id);

  note('XTRIM 控制长度，否则 stream 会一直涨');
  for (let i = 0; i < 20; i++) await redis.xadd(stream, '*', 'seq', String(i));
  cmd('XLEN (裁剪前)', await redis.xlen(stream));
  cmd('XTRIM MAXLEN 5 → 删掉', await redis.xtrim(stream, 'MAXLEN', 5));
  cmd('XLEN (裁剪后)', await redis.xlen(stream));
  note('生产环境用 MAXLEN ~ 5：近似裁剪，只删整个宏节点，快得多但长度不精确');
}
