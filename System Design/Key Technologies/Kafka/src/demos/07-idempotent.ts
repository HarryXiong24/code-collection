import type { Kafka } from 'kafkajs';
import { createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * 幂等生产者 —— 解决“重试导致重复写入”。
 *
 * 网络抖动时 producer 会重发，普通模式下 broker 可能把同一条写两遍。
 * 开 idempotent 后，broker 给每个 producer 分配 PID + 每条消息序号，
 * 重发的消息会被识别去重，做到分区内“恰好一次”落盘。
 * 代价：acks 强制为 all（等所有副本确认），且 maxInFlightRequests ≤ 5。
 */
export async function idempotentDemo(kafka: Kafka): Promise<void> {
  title('幂等生产者：去重 + acks=all');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('payments');
  await ensureTopic(admin, t, 1);
  await admin.disconnect();

  // idempotent:true 会自动把 acks 设成 -1(all)、maxInFlightRequests 收紧。
  const producer = createProducer(kafka, { idempotent: true });
  await producer.connect();

  try {
    note('acks=all：leader 要等所有 in-sync 副本都写完才回 ack —— 最不容易丢');
    const r = await producer.send({
      topic: t,
      messages: [
        { key: 'pay-1', value: '$100' },
        { key: 'pay-2', value: '$250' },
      ],
    });
    cmd('idempotent send → 落盘', r.map((m) => `p${m.partition}@${m.baseOffset}`));
    note('若 SDK 内部重试，broker 靠 PID+序号识别重发，不会写成两条');
    note('注意：只保证“单个 producer、单分区”不重复，跨分区/跨会话要用事务');
  } finally {
    await producer.disconnect();
  }
}
