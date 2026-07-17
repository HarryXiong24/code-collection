import { cleanup, createClient } from './client.js';
import { describeConfig } from './config.js';
import { cmd, error, note, title } from './log.js';
import { crudDemo } from './demos/01-index-crud.js';
import { bulkDemo } from './demos/02-bulk.js';
import { searchDemo } from './demos/03-search.js';
import { aggregationDemo } from './demos/04-aggregation.js';
import { paginationDemo } from './demos/05-pagination.js';
import { mappingDemo } from './demos/06-mapping-analyzer.js';

const DEMOS = {
  crud: crudDemo,
  bulk: bulkDemo,
  search: searchDemo,
  agg: aggregationDemo,
  page: paginationDemo,
  mapping: mappingDemo,
} as const;

type DemoName = keyof typeof DEMOS;

/** `npm start` 跑全部；`npm start search agg` 只跑指定的几个。 */
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
  const client = createClient();

  title('连接 Elasticsearch');
  cmd('目标', describeConfig());

  try {
    const info = await client.info();
    cmd('集群', info.cluster_name);
    cmd('版本', info.version.number);
  } catch (e) {
    error(`连不上 Elasticsearch: ${(e as Error).message}`);
    note('本地起一个（单节点、关认证，方便 demo）:');
    note('  docker run -d -p 9200:9200 -e discovery.type=single-node \\');
    note('    -e xpack.security.enabled=false elasticsearch:8.14.0');
    note('或在 .env / src/config.ts 里填连接信息');
    await client.close();
    process.exit(1);
  }

  try {
    for (const name of names) await DEMOS[name](client);

    title('清理');
    cmd('删除的 demo-* 索引', await cleanup(client));
  } finally {
    await client.close();
  }
  console.log();
}

main().catch((e) => {
  error((e as Error).stack ?? String(e));
  process.exit(1);
});
