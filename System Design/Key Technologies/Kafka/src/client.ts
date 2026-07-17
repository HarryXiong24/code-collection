import {
  Kafka,
  Partitioners,
  logLevel,
  type Admin,
  type Consumer,
  type ConsumerRunConfig,
  type EachMessagePayload,
  type Producer,
  type SASLOptions,
} from 'kafkajs';
import { resolveConfig } from './config.js';

/**
 * 一个 Kafka 实例 = 一套连接工厂：从它派生 producer / consumer / admin，
 * 各自独立连接。demo 里每个场景按需 new 出自己的角色，用完 disconnect。
 */
export function createKafka(): Kafka {
  const c = resolveConfig();
  return new Kafka({
    clientId: c.clientId,
    brokers: c.brokers,
    ssl: c.ssl,
    // config 里 mechanism 是宽松的字符串联合，KafkaJS 要的是判别联合，边界处收窄。
    sasl: c.sasl as SASLOptions | undefined,
    // demo 不想被无限重连卡住：连不上快速失败。
    retry: { retries: 3, initialRetryTime: 200 },
    logLevel: logLevel.NOTHING,
  });
}

/**
 * 显式指定 DefaultPartitioner，否则 KafkaJS 会打一条 partitioner 迁移警告。
 * DefaultPartitioner：有 key 按 key 哈希定分区，没 key 走粘性轮询。
 */
export function createProducer(kafka: Kafka, options: Parameters<Kafka['producer']>[0] = {}): Producer {
  return kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner, ...options });
}

/** demo 里所有 topic 都带前缀，跑完能一把清干净，也不会碰你现有的 topic。 */
export const NS = 'demo';
export const topic = (...parts: string[]): string => [NS, ...parts].join('.');

/** 建 topic，已存在会返回 false（不是报错），所以可以重复跑。 */
export async function ensureTopic(admin: Admin, name: string, numPartitions = 1): Promise<boolean> {
  return admin.createTopics({
    waitForLeaders: true,
    topics: [{ topic: name, numPartitions, replicationFactor: 1 }],
  });
}

/**
 * 把 consumer 跑起来，收满 count 条或超时就停，返回收到的消息。
 *
 * 注意 consumer.run 一个消费者只能调一次 —— 想重放/二次消费要换新的 consumer。
 * run 选项（如 autoCommit）通过 runOptions 传进去。
 */
export async function collect(
  consumer: Consumer,
  count: number,
  timeoutMs = 4000,
  runOptions: Omit<ConsumerRunConfig, 'eachMessage' | 'eachBatch'> = {},
): Promise<EachMessagePayload[]> {
  const out: EachMessagePayload[] = [];
  await new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    // consumer.run 立刻返回，后台起一个拉取循环；收够了就提前 resolve。
    void consumer.run({
      ...runOptions,
      eachMessage: async (payload) => {
        out.push(payload);
        if (out.length >= count) {
          clearTimeout(timer);
          resolve();
        }
      },
    });
  });
  return out;
}

/** 按前缀删掉所有 demo.* topic。 */
export async function cleanup(admin: Admin): Promise<string[]> {
  const mine = (await admin.listTopics()).filter((t) => t === NS || t.startsWith(`${NS}.`));
  if (mine.length > 0) await admin.deleteTopics({ topics: mine, timeout: 5000 });
  return mine;
}
