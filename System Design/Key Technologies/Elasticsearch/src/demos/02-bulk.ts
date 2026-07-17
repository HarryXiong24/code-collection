import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * 批量写入 —— 逐条 index 每条都要一次网络往返，慢。bulk 把成百上千条
 * 操作打成一个请求发出去，是灌数据的标准姿势。
 *
 * operations 是「一行动作、一行文档」交替的扁平数组：
 *   [ {index:{...}}, {doc}, {delete:{...}}, {update:{...}}, {doc}, ... ]
 * 一个 bulk 里可以混用 index / create / update / delete 四种动作。
 */
export async function bulkDemo(client: Client): Promise<void> {
  title('批量写入：bulk / 部分失败处理');

  const idx = index('bulk');
  await client.indices.delete({ index: idx, ignore_unavailable: true });
  await client.indices.create({
    index: idx,
    mappings: { properties: { city: { type: 'keyword' }, pop: { type: 'integer' } } },
  });

  const cities = [
    { city: 'Beijing', pop: 21540000 },
    { city: 'Shanghai', pop: 24870000 },
    { city: 'Shenzhen', pop: 17560000 },
    { city: 'Guangzhou', pop: 18670000 },
  ];

  note('一行动作一行文档，交替铺平；不给 _id 就让 ES 自动生成');
  const operations = cities.flatMap((doc) => [{ index: { _index: idx } }, doc]);
  const res = await client.bulk({ operations, refresh: true });

  cmd('bulk 写入条数', cities.length);
  cmd('整体是否有错 (errors)', res.errors);
  cmd('耗时 took(ms)', res.took);

  note('bulk 是「部分成功」语义：某条失败不影响其它条，要自己遍历 items 查');
  note('故意制造一条类型错误：pop 塞字符串，看 ES 怎么报');
  const bad = await client.bulk({
    operations: [
      { index: { _index: idx } },
      { city: 'Chengdu', pop: 20940000 },
      { index: { _index: idx } },
      { city: 'BrokenCity', pop: 'not-a-number' },
    ],
    refresh: true,
  });
  cmd('本批 errors', bad.errors);
  bad.items.forEach((item, i) => {
    const op = item.index;
    if (op?.error) cmd(`  第 ${i} 条失败`, { type: op.error.type, reason: op.error.reason?.slice(0, 60) });
    else cmd(`  第 ${i} 条`, { status: op?.status, result: op?.result });
  });

  note('count：看看最终成功落库多少条');
  const { count } = await client.count({ index: idx });
  cmd('count', count);

  note('真要灌几十万条，用官方 helpers.bulk：自动分批、并发、重试、背压');
  note('  await client.helpers.bulk({ datasource, onDocument: d => ({ index:{_index} }) })');
}
