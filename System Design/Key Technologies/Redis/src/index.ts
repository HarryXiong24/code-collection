import { cleanup, createClient } from './client.js';
import { describeConfig } from './config.js';
import { cmd, error, note, title } from './log.js';
import { stringDemo } from './demos/01-string.js';
import { hashDemo } from './demos/02-hash.js';
import { listDemo } from './demos/03-list.js';
import { setDemo } from './demos/04-set.js';
import { zsetDemo } from './demos/05-zset.js';
import { expireDemo } from './demos/06-expire.js';
import { pubsubDemo } from './demos/07-pubsub.js';
import { pipelineDemo } from './demos/08-pipeline-transaction.js';
import { luaLockDemo } from './demos/09-lua-lock.js';
import { streamDemo } from './demos/10-stream.js';

const DEMOS = {
  string: stringDemo,
  hash: hashDemo,
  list: listDemo,
  set: setDemo,
  zset: zsetDemo,
  expire: expireDemo,
  pubsub: pubsubDemo,
  pipeline: pipelineDemo,
  lock: luaLockDemo,
  stream: streamDemo,
} as const;

type DemoName = keyof typeof DEMOS;

/** `npm start` 跑全部；`npm start zset lock` 只跑指定的几个。 */
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
  const redis = createClient();

  title('连接 Redis');
  cmd('目标', describeConfig());

  try {
    await redis.connect();
    cmd('PING', await redis.ping());
    const version = (await redis.info('server')).match(/redis_version:(\S+)/)?.[1];
    cmd('版本', version ?? 'unknown');
  } catch (e) {
    error(`连不上 Redis: ${(e as Error).message}`);
    note('本地起一个: docker run -d -p 6379:6379 redis:7-alpine');
    note('或在 .env / src/config.ts 里填连接信息');
    redis.disconnect();
    process.exit(1);
  }

  try {
    for (const name of names) await DEMOS[name](redis);

    title('清理');
    cmd('删除 demo:* 下的 key', await cleanup(redis));
  } finally {
    await redis.quit();
  }
  console.log();
}

main().catch((e) => {
  error((e as Error).stack ?? String(e));
  process.exit(1);
});
