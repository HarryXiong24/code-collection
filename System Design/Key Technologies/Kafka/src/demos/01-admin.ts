import type { Kafka } from 'kafkajs';
import { NS, ensureTopic, topic } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Admin —— 主题（topic）的增删查改。
 *
 * topic 是 Kafka 里消息的分类；每个 topic 切成若干 partition（分区），
 * 分区是并行和有序的最小单位：同一分区内严格有序，跨分区无序。
 * 分区数只能加不能减 —— 这是 Kafka 的硬约束，设计时要想清楚。
 */
export async function adminDemo(kafka: Kafka): Promise<void> {
  title('Admin：主题的增删查');

  const admin = kafka.admin();
  await admin.connect();

  try {
    const name = topic('admin', 'playground');

    const created = await ensureTopic(admin, name, 3);
    cmd(`createTopics ${name}`, created ? '新建（3 分区）' : '已存在，跳过');

    const mine = (await admin.listTopics()).filter((t) => t.startsWith(NS));
    cmd('listTopics (demo.*)', mine);

    const meta = await admin.fetchTopicMetadata({ topics: [name] });
    const partitions = meta.topics[0]?.partitions ?? [];
    cmd('当前分区数', partitions.length);
    note('每个分区有一个 leader broker 负责读写，副本（replica）跟在后面同步');

    note('分区只能加不能减');
    await admin.createPartitions({ topicPartitions: [{ topic: name, count: 5 }] });
    const after = await admin.fetchTopicMetadata({ topics: [name] });
    cmd('createPartitions → 扩容到', after.topics[0]?.partitions.length);

    await admin.deleteTopics({ topics: [name], timeout: 5000 });
    cmd(`deleteTopics ${name}`, 'OK');
  } finally {
    await admin.disconnect();
  }
}
