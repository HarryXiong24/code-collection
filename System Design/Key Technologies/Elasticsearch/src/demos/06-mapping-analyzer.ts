import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * Mapping 与分词器 —— 决定字段怎么存、怎么被搜到，是 ES 里最该想清楚的一步。
 *
 * text vs keyword，这是最常踩的坑：
 *   text    → 会过分词器（analyzer）拆成词元再建倒排索引，支持全文检索，但不能精确聚合/排序。
 *   keyword → 原样整存，支持精确匹配、排序、聚合，但不做全文检索。
 * 动态映射下一个字符串字段会被同时映射成 text + 一个 .keyword 子字段，两头都能用。
 *
 * analyzer 把一段文本切成词元。standard 按词切并转小写，所以搜 "Quick" 能命中 "quick"。
 */
export async function mappingDemo(client: Client): Promise<void> {
  title('Mapping 与分词器：text vs keyword / _analyze');

  const idx = index('mapping');
  await client.indices.delete({ index: idx, ignore_unavailable: true });

  note('显式 mapping：同一份文本，一个字段建 text，一个建 keyword，对比行为');
  await client.indices.create({
    index: idx,
    mappings: {
      properties: {
        title_text: { type: 'text' },
        title_keyword: { type: 'keyword' },
        // 常见写法：主字段 text 做检索，子字段 keyword 做聚合/排序
        status: {
          type: 'text',
          fields: { raw: { type: 'keyword' } },
        },
      },
    },
  });

  await client.index({ index: idx, id: '1', document: { title_text: 'The Quick Brown Fox', title_keyword: 'The Quick Brown Fox', status: 'in stock' }, refresh: true });

  note('_analyze：看看 standard 分词器把这句话切成了什么');
  const analyzed = await client.indices.analyze({ index: idx, analyzer: 'standard', text: 'The Quick Brown Fox' });
  cmd('standard 分词结果', analyzed.tokens?.map((t) => t.token));

  note('对 text 字段用 match "quick"：分词+小写后能命中');
  const onText = await client.search({ index: idx, query: { match: { title_text: 'quick' } } });
  cmd('match title_text="quick"', textHits(onText));

  note('对 keyword 字段用 term "quick"：整存不分词，值不等，查不到');
  const onKwTerm = await client.search({ index: idx, query: { term: { title_keyword: 'quick' } } });
  cmd('term title_keyword="quick"', textHits(onKwTerm));

  note('keyword 要整个值全等才命中');
  const onKwFull = await client.search({ index: idx, query: { term: { title_keyword: 'The Quick Brown Fox' } } });
  cmd('term title_keyword=完整值', textHits(onKwFull));

  note('多字段（fields）：status 做全文检索，status.raw 做精确聚合');
  const searchStatus = await client.search({ index: idx, query: { match: { status: 'stock' } } });
  cmd('match status="stock"（走 text）', textHits(searchStatus));
  const aggStatus = await client.search({
    index: idx,
    size: 0,
    aggs: { by_status: { terms: { field: 'status.raw' } } },
  });
  type TermsAgg = { buckets: { key: string; doc_count: number }[] };
  cmd('terms status.raw（走 keyword 子字段）', (aggStatus.aggregations?.by_status as TermsAgg).buckets.map((b) => ({ [b.key]: b.doc_count })));

  note('查看最终 mapping：动态生成的映射也能这么看，方便排查「为什么搜不到」');
  const mapping = await client.indices.getMapping({ index: idx });
  cmd('title_text 的类型', (mapping[idx]?.mappings?.properties?.title_text as { type: string })?.type);
  cmd('status 的子字段', Object.keys((mapping[idx]?.mappings?.properties?.status as { fields?: object })?.fields ?? {}));
}

function textHits(res: { hits: { hits: { _id?: string }[] } }): string {
  const ids = res.hits.hits.map((h) => h._id ?? '?');
  return ids.length ? `命中 ${ids.length} 条 (id=${ids.join(',')})` : '无命中';
}
