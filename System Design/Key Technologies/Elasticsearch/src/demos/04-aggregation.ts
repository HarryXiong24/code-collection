import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';
import { type Product, seedProducts } from '../seed.js';

/**
 * 聚合 —— ES 的「GROUP BY + 统计」，分析场景的主力。分两大类：
 *
 *   指标聚合（metric）  → 对一批文档算个数：avg / sum / min / max / stats…
 *   桶聚合（bucket）    → 把文档分组：terms（按值分）、range、date_histogram…
 *
 * 桶里可以再嵌子聚合，这就是「每个品牌的平均价」这类需求的实现方式。
 * 只要聚合不要命中文档时，设 size:0 —— 省掉返回 hits 的开销。
 */
export async function aggregationDemo(client: Client): Promise<void> {
  title('聚合：metric / terms 分组 / 嵌套');

  const idx = index('agg');
  await seedProducts(client, idx);

  note('size:0 → 不返回文档，只要聚合结果');

  note('指标聚合：全局价格 stats（count/min/max/avg/sum 一把出）');
  const stats = await client.search<Product>({
    index: idx,
    size: 0,
    aggs: { price_stats: { stats: { field: 'price' } } },
  });
  cmd('price stats', stats.aggregations?.price_stats);

  note('terms 桶：按 category 分组，doc_count 是每组文档数');
  const byCat = await client.search<Product>({
    index: idx,
    size: 0,
    aggs: { by_category: { terms: { field: 'category' } } },
  });
  type TermsAgg = { buckets: { key: string; doc_count: number }[] };
  const catBuckets = (byCat.aggregations?.by_category as TermsAgg).buckets;
  cmd('按 category 分组', catBuckets.map((b) => ({ [b.key]: b.doc_count })));

  note('嵌套聚合：每个品牌下，再算平均价 + 总库存');
  const byBrand = await client.search<Product>({
    index: idx,
    size: 0,
    aggs: {
      by_brand: {
        terms: { field: 'brand', order: { avg_price: 'desc' } },
        aggs: {
          avg_price: { avg: { field: 'price' } },
          total_stock: { sum: { field: 'stock' } },
        },
      },
    },
  });
  type NestedAgg = { buckets: { key: string; doc_count: number; avg_price: { value: number }; total_stock: { value: number } }[] };
  const brandBuckets = (byBrand.aggregations?.by_brand as NestedAgg).buckets;
  cmd('按品牌（avg 降序）', brandBuckets.map((b) => ({
    brand: b.key,
    count: b.doc_count,
    avgPrice: Math.round(b.avg_price.value),
    stock: b.total_stock.value,
  })));

  note('query + aggs：聚合默认只统计命中的文档。这里先过滤 price<100 再分组');
  const filtered = await client.search<Product>({
    index: idx,
    size: 0,
    query: { range: { price: { lt: 100 } } },
    aggs: { cheap_by_category: { terms: { field: 'category' } } },
  });
  const cheapBuckets = (filtered.aggregations?.cheap_by_category as TermsAgg).buckets;
  cmd('price<100 的按 category 分组', cheapBuckets.map((b) => ({ [b.key]: b.doc_count })));

  note('range 桶：自定义价格档位');
  const priceBands = await client.search<Product>({
    index: idx,
    size: 0,
    aggs: {
      price_bands: {
        range: {
          field: 'price',
          ranges: [{ to: 50 }, { from: 50, to: 200 }, { from: 200 }],
        },
      },
    },
  });
  type RangeAgg = { buckets: { key: string; doc_count: number }[] };
  cmd('价格档位分布', (priceBands.aggregations?.price_bands as RangeAgg).buckets.map((b) => ({ [b.key]: b.doc_count })));
}
