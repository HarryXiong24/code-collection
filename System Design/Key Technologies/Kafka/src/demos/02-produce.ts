import type { Kafka } from 'kafkajs';
import { createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Producer —— 把消息写进 topic。
 *
 * 一条消息的结构：key（决定分区、可空）、value（正文）、headers（元数据）、
 * timestamp。send 返回 RecordMetadata：消息落到了哪个分区、什么 offset。
 * offset 是分区内单调递增的行号，消费者就靠它记录“读到哪了”。
 */
export async function produceDemo(kafka: Kafka): Promise<void> {
  title('Producer：发送消息');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('orders');
  await ensureTopic(admin, t, 3);
  await admin.disconnect();

  const producer = createProducer(kafka);
  await producer.connect();

  try {
    note('单条发送，value 必须是 string 或 Buffer —— 对象要自己 JSON.stringify');
    const one = await producer.send({
      topic: t,
      messages: [
        {
          key: 'user-1',
          value: JSON.stringify({ item: 'book', qty: 2 }),
          headers: { source: 'demo', 'content-type': 'application/json' },
        },
      ],
    });
    cmd('send 1 条 → 落在', one.map((r) => `p${r.partition}@offset${r.baseOffset}`));

    note('一次 send 传多条 = 一个 batch，网络往返只有一次，吞吐关键');
    const many = await producer.send({
      topic: t,
      messages: [
        { key: 'user-1', value: 'again from user-1' },
        { key: 'user-2', value: 'hello from user-2' },
        { value: 'no key: 粘性轮询挑分区' },
      ],
    });
    cmd('send 3 条 → 分区分布', many.map((r) => `p${r.partition}@${r.baseOffset}`));
    note('同一个 key 永远进同一个分区 —— user-1 的两条一定相邻同序');

    note('sendBatch 可以一次写多个 topic');
    await producer.sendBatch({
      topicMessages: [
        { topic: t, messages: [{ key: 'user-3', value: 'batched' }] },
      ],
    });
    cmd('sendBatch', 'OK');
  } finally {
    await producer.disconnect();
  }
}
