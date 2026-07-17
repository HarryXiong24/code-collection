import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';
import { type Product, seedProducts } from '../seed.js';

/**
 * 分页 —— ES 有三种翻页方式，坑主要在第一种：
 *
 *   from/size   → 最直观，但 from+size 不能超过 index.max_result_window（默认 1 万）。
 *                 深翻（from=9990）时每个分片都要取 from+size 条再汇总，越翻越慢。
 *                 只适合「让用户翻前几页」。
 *   search_after → 游标式深分页。带上上一页最后一条的 sort 值往后取，无深度惩罚，
 *                 是「导出全部 / 无限下拉」的正解。要求排序里带一个唯一字段（如 _id）保证稳定。
 *   scroll       → 老方案，维护一份快照。官方已建议用 search_after + PIT 替代，这里不展开。
 */
export async function paginationDemo(client: Client): Promise<void> {
  title('分页：from/size vs search_after');

  const idx = index('page');
  await seedProducts(client, idx);

  note('from/size：第 1 页（每页 3 条），按价格升序');
  const page1 = await client.search<Product>({
    index: idx,
    from: 0,
    size: 3,
    sort: [{ price: 'asc' }],
    _source: ['name', 'price'],
  });
  const total = typeof page1.hits.total === 'number' ? page1.hits.total : page1.hits.total?.value;
  cmd('总命中数', total);
  cmd('第 1 页', page1.hits.hits.map((h) => h._source));

  note('from/size：第 2 页 → from=3');
  const page2 = await client.search<Product>({
    index: idx,
    from: 3,
    size: 3,
    sort: [{ price: 'asc' }],
    _source: ['name', 'price'],
  });
  cmd('第 2 页', page2.hits.hits.map((h) => h._source));
  warn_from_size();

  note('search_after：排序里加一个唯一字段（name.keyword）兜底，保证 sort 值唯一、顺序稳定');
  note('  别拿 _id 当 tiebreaker —— 对 _id 排序要 fielddata，默认是禁用的');
  const sort: Array<Record<string, 'asc' | 'desc'>> = [{ price: 'asc' }, { 'name.keyword': 'asc' }];
  const first = await client.search<Product>({ index: idx, size: 3, sort, _source: ['name', 'price'] });
  cmd('search_after 第 1 批', first.hits.hits.map((h) => h._source));

  note('拿上一批最后一条的 sort 值当游标，往后翻，无深度惩罚');
  const lastSort = first.hits.hits.at(-1)?.sort;
  const second = await client.search<Product>({
    index: idx,
    size: 3,
    sort,
    search_after: lastSort,
    _source: ['name', 'price'],
  });
  cmd('search_after 第 2 批', second.hits.hits.map((h) => h._source));

  note('循环 search_after 直到取空，就能稳定遍历全量（生产建议再配合 PIT 冻结视图）');
  let cursor = second.hits.hits.at(-1)?.sort;
  let round = 3;
  while (cursor) {
    const next = await client.search<Product>({ index: idx, size: 3, sort, search_after: cursor, _source: ['name'] });
    if (next.hits.hits.length === 0) break;
    cmd(`search_after 第 ${round} 批`, next.hits.hits.map((h) => (h._source as Product).name));
    cursor = next.hits.hits.at(-1)?.sort;
    round++;
  }
}

function warn_from_size(): void {
  note('坑：from+size 默认上限 1 万。深翻很慢，别拿它做「导出全部」，那是 search_after 的活');
}
