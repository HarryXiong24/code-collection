import type { Kafka } from 'kafkajs';
import { createProducer, ensureTopic, topic } from '../client.js';
import { cmd, note, sleep, title } from '../log.js';

/**
 * 消费组与再均衡（rebalance）—— Kafka 横向扩展的核心。
 *
 * 一个分区在同一时刻只会分给组内的一个消费者。所以：
 *   - 想并行消费，就加消费者，但并行度上限 = 分区数（多出来的消费者会闲着）。
 *   - 有人加入/退出，组会 rebalance，重新分配分区。
 * 这里在一个组里放两个消费者，直接读 GROUP_JOIN 事件里的分区分配结果，
 * 看两个分区怎么被瓜分 —— 这比“谁收到了消息”更能说明分配本身。
 */
export async function consumerGroupDemo(kafka: Kafka): Promise<void> {
  title('消费组：两个消费者瓜分分区');

  const admin = kafka.admin();
  await admin.connect();
  const t = topic('jobs');
  await ensureTopic(admin, t, 2);
  await admin.disconnect();

  const producer = createProducer(kafka);
  await producer.connect();
  // 显式指定分区，确保两个分区都有数据（不靠 key 哈希撞运气）。
  await producer.send({
    topic: t,
    messages: [0, 1, 2, 3, 4, 5].map((i) => ({ partition: i % 2, value: `job-${i}` })),
  });
  await producer.disconnect();
  cmd('写入', '6 条，均匀分到 p0 / p1');

  const groupId = 'demo-worker-pool';
  const c1 = kafka.consumer({ groupId });
  const c2 = kafka.consumer({ groupId });
  const owns = { A: [] as number[], B: [] as number[] };

  // GROUP_JOIN 在每次 rebalance 完成时触发，memberAssignment 就是最终分到的分区。
  c1.on(c1.events.GROUP_JOIN, (e) => void (owns.A = e.payload.memberAssignment[t] ?? []));
  c2.on(c2.events.GROUP_JOIN, (e) => void (owns.B = e.payload.memberAssignment[t] ?? []));

  await Promise.all([c1.connect(), c2.connect()]);
  await Promise.all([
    c1.subscribe({ topic: t, fromBeginning: true }),
    c2.subscribe({ topic: t, fromBeginning: true }),
  ]);

  // run 才会触发加入组；eachMessage 这里不关心内容，只为把消费者跑起来。
  await c1.run({ eachMessage: async () => {} });
  await c2.run({ eachMessage: async () => {} });

  note('等两个消费者都加入、rebalance 稳定（几秒）');
  await sleep(6000);

  cmd('消费者 A 分到的分区', owns.A);
  cmd('消费者 B 分到的分区', owns.B);
  note('两个分区一人一个、互不重叠 —— 这就是消费组的负载均衡');
  note('再加第 3 个消费者会因无空闲分区而空转；分区数就是并行度上限');

  await Promise.all([c1.disconnect(), c2.disconnect()]);
}
