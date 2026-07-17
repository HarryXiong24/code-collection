import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';
import { type Product, seedProducts } from '../seed.js';

/** 把命中结果压成 name + score，方便一行打印。 */
function hits(res: { hits: { hits: { _score?: number | null; _source?: unknown }[] } }): unknown[] {
  return res.hits.hits.map((h) => ({
    name: (h._source as Product).name,
    score: h._score == null ? null : Math.round(h._score * 100) / 100,
  }));
}

/**
 * 检索 —— ES 的看家本领。核心要分清两类查询：
 *
 *   match  → 全文检索。查询词会被分词，对 text 字段做相关性打分（_score），
 *            "keyboard pro" 会拆成 keyboard / pro 分别匹配。
 *   term   → 精确匹配。不分词，整个值全等，用于 keyword / 数字 / 日期。
 *            对 text 字段用 term 往往查不到（因为存的是分词后的词元）。
 *
 * bool 把多个条件组合起来：must（且，算分）、filter（且，不算分可缓存）、
 * should（或，加分）、must_not（非）。过滤条件放 filter 比 must 快。
 */
export async function searchDemo(client: Client): Promise<void> {
  title('检索：match / term / bool 组合');

  const idx = index('search');
  await seedProducts(client, idx);

  note('match：全文检索，查询词分词后按相关性打分，_score 越高越靠前');
  const m = await client.search<Product>({
    index: idx,
    query: { match: { name: 'keyboard pro' } },
  });
  cmd('match name="keyboard pro"', hits(m));

  note('term：精确匹配 keyword 字段，不分词、不打分（filter 语境）');
  const t = await client.search<Product>({
    index: idx,
    query: { term: { brand: 'Keychron' } },
  });
  cmd('term brand=Keychron', hits(t));

  note('range：数值/日期区间');
  const r = await client.search<Product>({
    index: idx,
    query: { range: { price: { gte: 50, lte: 100 } } },
  });
  cmd('range price∈[50,100]', hits(r));

  note('bool：must 算分匹配 + filter 精确过滤（filter 不影响 _score，还能被缓存）');
  const b = await client.search<Product>({
    index: idx,
    query: {
      bool: {
        must: [{ match: { name: 'mouse' } }],
        filter: [{ term: { brand: 'Logitech' } }, { range: { price: { lte: 50 } } }],
      },
    },
  });
  cmd('bool: name~mouse AND brand=Logitech AND price≤50', hits(b));

  note('should：满足其一即命中，命中越多分越高（可用 minimum_should_match 设下限）');
  const s = await client.search<Product>({
    index: idx,
    query: {
      bool: {
        should: [{ term: { tags: 'rgb' } }, { term: { tags: 'wireless' } }],
        minimum_should_match: 1,
      },
    },
    size: 3,
  });
  cmd('should: tags 含 rgb 或 wireless (取前3)', hits(s));

  note('must_not：排除。这里排掉缺货的');
  const excluded = await client.search<Product>({
    index: idx,
    query: { bool: { must_not: [{ term: { stock: 0 } }] } },
    size: 100,
  });
  cmd('总数 vs 有货数', { total: 8, inStock: excluded.hits.hits.length });

  note('_source 裁剪 + sort：只取需要的字段，按价格降序');
  const sorted = await client.search<Product>({
    index: idx,
    query: { match_all: {} },
    sort: [{ price: 'desc' }],
    _source: ['name', 'price'],
    size: 3,
  });
  cmd('最贵的 3 个', sorted.hits.hits.map((h) => h._source));
}
