import type { Kafka } from 'kafkajs';
import { collect, createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Consumer —— 从 topic 读消息。
 *
 * 消费者必须属于一个 groupId（消费组）。fromBeginning 控制第一次加入时
 * 从最早的消息读，还是只读之后的新消息。eachMessage 是每条消息的回调，
 * 返回后 KafkaJS 才推进 offset —— 处理失败就别 return，消息会重投。
 */
export async function consumeDemo(kafka: Kafka): Promise<void> {
  title('Consumer：消费组读取');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('events');
  await ensureTopic(admin, t, 1);
  await admin.disconnect();

  const producer = createProducer(kafka);
  await producer.connect();
  await producer.send({
    topic: t,
    messages: [1, 2, 3].map((n) => ({ key: `k${n}`, value: `event-${n}` })),
  });
  await producer.disconnect();
  cmd('预先写入', '3 条消息');

  const consumer = kafka.consumer({ groupId: 'demo-consume-group' });
  await consumer.connect();
  // fromBeginning: 这个组第一次读，从头收；已经有提交过的 offset 则从那接着读。
  await consumer.subscribe({ topic: t, fromBeginning: true });

  note('eachMessage 逐条回调，value 是 Buffer，要 .toString() 才是文本');
  const got = await collect(consumer, 3);
  for (const { message, partition } of got) {
    cmd(`p${partition}@offset${message.offset}`, message.value?.toString());
  }
  cmd('共收到', got.length);
  note('offset 会随处理进度自动提交，下次同组启动不会重复读这几条');

  await consumer.disconnect();
}
