import type { Kafka } from 'kafkajs';
import { collect, createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * 事务 —— 跨分区/跨 topic 的原子写，Exactly-Once 的基石。
 *
 * 一个事务里的多条消息，要么全部对消费者可见，要么全部不可见（abort）。
 * 关键是消费端要设 readUncommitted:false（KafkaJS 默认就是），
 * 这样 abort 掉的消息永远读不到。事务生产者必须配 transactionalId。
 *
 * 典型场景：consume-transform-produce，把“读到的 offset 提交”和“产出的
 * 消息”绑进同一个事务，实现端到端 Exactly-Once。
 */
export async function transactionDemo(kafka: Kafka): Promise<void> {
  title('事务：commit 可见 / abort 蒸发');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('tx-out');
  await ensureTopic(admin, t, 1);
  await admin.disconnect();

  const producer = createProducer(kafka, { transactionalId: 'demo-tx-producer', idempotent: true });
  await producer.connect();

  // 事务一：正常提交，两条应该都能被读到。
  const tx1 = await producer.transaction();
  try {
    await tx1.send({ topic: t, messages: [{ value: 'committed-A' }, { value: 'committed-B' }] });
    await tx1.commit();
    cmd('事务1', 'commit（2 条）');
  } catch (e) {
    await tx1.abort();
    throw e;
  }

  // 事务二：故意 abort，这两条对消费者应当完全不可见。
  const tx2 = await producer.transaction();
  await tx2.send({ topic: t, messages: [{ value: 'aborted-X' }, { value: 'aborted-Y' }] });
  await tx2.abort();
  cmd('事务2', 'abort（2 条，应蒸发）');

  await producer.disconnect();

  // 默认 readUncommitted:false —— 只读已提交的。
  const consumer = kafka.consumer({ groupId: 'demo-tx-reader', readUncommitted: false });
  await consumer.connect();
  await consumer.subscribe({ topic: t, fromBeginning: true });

  const got = await collect(consumer, 2, 4000);
  cmd('读到的消息', got.map((p) => p.message.value?.toString()));
  note('只有 committed-* 出现，aborted-* 被隔离掉了 —— 这就是 read-committed');

  await consumer.disconnect();
}
