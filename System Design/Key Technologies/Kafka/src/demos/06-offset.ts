import type { Kafka } from 'kafkajs';
import { collect, createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Offset —— 消费进度就是一个数字，理解它就理解了 Kafka 的“可重放”。
 *
 * 消息不会因为被消费就删除（到期或超量才按 retention 清理），消费者只是
 * 维护一个 offset 游标。于是能干两件事：
 *   - 手动提交：处理成功再提交，配合幂等做“至少一次”，避免自动提交丢消息。
 *   - seek 重放：把游标拨回去，重新消费历史消息（回填、修数据、调试）。
 */
export async function offsetDemo(kafka: Kafka): Promise<void> {
  title('Offset：手动提交与重放');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('ledger');
  await ensureTopic(admin, t, 1);
  await admin.disconnect();

  const producer = createProducer(kafka);
  await producer.connect();
  await producer.send({
    topic: t,
    messages: Array.from({ length: 5 }, (_, i) => ({ value: `txn-${i}` })),
  });
  await producer.disconnect();
  cmd('写入', '5 条 txn-0..4');

  const groupId = 'demo-offset-group';

  // 第一遍：关掉自动提交，读完后自己手动提交进度。
  const c1 = kafka.consumer({ groupId });
  await c1.connect();
  await c1.subscribe({ topic: t, fromBeginning: true });
  const first = await collect(c1, 5, 4000, { autoCommit: false });
  cmd('第一遍读到', first.map((p) => p.message.value?.toString()));

  const next = String(Number(first.at(-1)?.message.offset ?? '-1') + 1);
  await c1.commitOffsets([{ topic: t, partition: 0, offset: next }]);
  cmd('手动提交进度 offset', next);
  note('提交的 offset 指向“下一条要读的位置”，读了 0..4 就提交 5');
  await c1.disconnect();

  const committed = await committedOffset(kafka, groupId, t);
  cmd('组里记录的已提交 offset', committed);

  // 第二遍：新消费者，同一个组。因为已经提交到 5，正常读不到任何东西 ——
  // 用 seek 在加入组后把游标拨回 0，历史被完整重放。
  const c2 = kafka.consumer({ groupId });
  await c2.connect();
  await c2.subscribe({ topic: t, fromBeginning: true });
  c2.on(c2.events.GROUP_JOIN, () => c2.seek({ topic: t, partition: 0, offset: '0' }));

  const replay = await collect(c2, 5, 4000);
  cmd('seek(0) 重放读到', replay.map((p) => p.message.value?.toString()));
  note('同一批消息被重新消费 —— 数据一直在，游标想拨哪就拨哪');
  await c2.disconnect();
}

/** 单独开个 admin 查这个组在该 topic 上提交到哪了。 */
async function committedOffset(kafka: Kafka, groupId: string, t: string): Promise<string | undefined> {
  const admin = kafka.admin();
  await admin.connect();
  try {
    const offsets = await admin.fetchOffsets({ groupId, topics: [t] });
    return offsets[0]?.partitions[0]?.offset;
  } finally {
    await admin.disconnect();
  }
}
