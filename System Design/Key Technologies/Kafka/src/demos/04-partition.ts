import type { Kafka } from 'kafkajs';
import { createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * 分区与顺序 —— Kafka 最容易踩的心智模型。
 *
 * 顺序性只在“单个分区内”成立，不是全局。谁进哪个分区由 key 决定：
 * 相同 key → 相同分区 → 严格有序。想让某个实体（用户、订单）的事件
 * 保序，就拿它的 id 当 key。没有 key 的消息会被摊到各分区，没有跨分区顺序。
 */
export async function partitionDemo(kafka: Kafka): Promise<void> {
  title('分区与顺序：key 决定去哪个分区');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('partitioned');
  await ensureTopic(admin, t, 3);
  await admin.disconnect();

  const producer = createProducer(kafka);
  await producer.connect();

  try {
    note('同一个 key 连发 4 条，看它们是不是都落在同一个分区');
    const sameKey = await producer.send({
      topic: t,
      messages: Array.from({ length: 4 }, (_, i) => ({ key: 'user-42', value: `evt-${i}` })),
    });
    const parts = [...new Set(sameKey.map((r) => r.partition))];
    cmd('key=user-42 的 4 条 → 分区', parts);
    note(parts.length === 1 ? '全在一个分区里，天然有序 ✓' : '意外分散了');

    note('换不同 key，观察它们被哈希打散到不同分区');
    const spread = await producer.send({
      topic: t,
      messages: ['alice', 'bob', 'carol', 'dave', 'eve'].map((key) => ({ key, value: `hi ${key}` })),
    });
    // send 的返回是按“写到的分区”聚合的，一个分区一条 RecordMetadata。
    cmd('5 个不同 key → 覆盖到的分区', [...new Set(spread.map((r) => r.partition))].sort());
    note('要保序就给同一实体固定 key；要吞吐就多分区 + key 打散');
  } finally {
    await producer.disconnect();
  }
}
