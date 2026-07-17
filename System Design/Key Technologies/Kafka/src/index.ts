import { cleanup, createKafka } from './client.js';
import { describeConfig } from './config.js';
import { cmd, error, note, title } from './log.js';

/**
 * KafkaJS 首次连接时内部超时计算会冒一条 TimeoutNegativeWarning，纯噪音。
 * 接管 warning 事件，只把这一条过滤掉，其余照常打印。
 */
const defaultWarningListeners = process.listeners('warning');
process.removeAllListeners('warning');
process.on('warning', (w) => {
  if (w.name === 'TimeoutNegativeWarning') return;
  for (const listener of defaultWarningListeners) listener(w);
});
import { adminDemo } from './demos/01-admin.js';
import { produceDemo } from './demos/02-produce.js';
import { consumeDemo } from './demos/03-consume.js';
import { partitionDemo } from './demos/04-partition.js';
import { consumerGroupDemo } from './demos/05-consumer-group.js';
import { offsetDemo } from './demos/06-offset.js';
import { idempotentDemo } from './demos/07-idempotent.js';
import { transactionDemo } from './demos/08-transaction.js';

const DEMOS = {
  admin: adminDemo,
  produce: produceDemo,
  consume: consumeDemo,
  partition: partitionDemo,
  group: consumerGroupDemo,
  offset: offsetDemo,
  idempotent: idempotentDemo,
  transaction: transactionDemo,
} as const;

type DemoName = keyof typeof DEMOS;

/** `npm start` 跑全部；`npm start group offset` 只跑指定的几个。 */
function selected(): DemoName[] {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  if (args.length === 0) return Object.keys(DEMOS) as DemoName[];

  const unknown = args.filter((a) => !(a in DEMOS));
  if (unknown.length > 0) {
    error(`未知的 demo: ${unknown.join(', ')}`);
    note(`可选: ${Object.keys(DEMOS).join(' | ')}`);
    process.exit(1);
  }
  return args as DemoName[];
}

async function main(): Promise<void> {
  const names = selected();
  const kafka = createKafka();

  title('连接 Kafka');
  cmd('目标 broker', describeConfig());

  const admin = kafka.admin();
  try {
    await admin.connect();
    const cluster = await admin.describeCluster();
    cmd('broker 数量', cluster.brokers.length);
    cmd('controller', cluster.controller);
  } catch (e) {
    error(`连不上 Kafka: ${(e as Error).message}`);
    note('本地起一个: docker run -d --name kafka -p 9092:9092 apache/kafka:3.9.0');
    note('或在 .env / src/config.ts 里填 KAFKA_BROKERS');
    await admin.disconnect().catch(() => {});
    process.exit(1);
  }

  try {
    for (const name of names) await DEMOS[name](kafka);

    title('清理');
    cmd('删除 demo.* 下的 topic', await cleanup(admin));
  } finally {
    await admin.disconnect();
  }
  console.log();
}

main().catch((e) => {
  error((e as Error).stack ?? String(e));
  process.exit(1);
});
