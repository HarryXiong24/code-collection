import type { Client } from '@elastic/elasticsearch';

/** demo 用的一批商品数据。搜索 / 聚合 / 分页三个 demo 共用。 */
export interface Product {
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  tags: string[];
  createdAt: string;
}

export const PRODUCTS: Product[] = [
  { name: 'Mechanical Keyboard Pro', brand: 'Keychron', category: 'keyboard', price: 89, stock: 32, tags: ['wireless', 'rgb'], createdAt: '2026-01-05' },
  { name: 'Wireless Mouse Lite', brand: 'Logitech', category: 'mouse', price: 29, stock: 120, tags: ['wireless'], createdAt: '2026-02-11' },
  { name: 'Ultrawide Monitor 34"', brand: 'Dell', category: 'monitor', price: 549, stock: 8, tags: ['4k', 'usb-c'], createdAt: '2026-01-20' },
  { name: 'USB-C Hub 8-in-1', brand: 'Anker', category: 'accessory', price: 45, stock: 60, tags: ['usb-c'], createdAt: '2026-03-02' },
  { name: 'Mechanical Keyboard Mini', brand: 'Keychron', category: 'keyboard', price: 69, stock: 0, tags: ['wireless', 'compact'], createdAt: '2026-03-15' },
  { name: 'Gaming Mouse Ultra', brand: 'Logitech', category: 'mouse', price: 79, stock: 15, tags: ['rgb', 'wired'], createdAt: '2026-02-28' },
  { name: '4K Monitor 27"', brand: 'LG', category: 'monitor', price: 399, stock: 22, tags: ['4k'], createdAt: '2026-01-30' },
  { name: 'Laptop Stand Aluminum', brand: 'Anker', category: 'accessory', price: 35, stock: 40, tags: ['aluminum'], createdAt: '2026-03-20' },
];

/**
 * 建索引并批量灌数据。demo 反复跑，先删后建保证干净。
 * refresh: true 让写入立刻可搜 —— ES 默认每秒刷新一次，demo 里等不起。
 */
export async function seedProducts(client: Client, index: string): Promise<void> {
  await client.indices.delete({ index, ignore_unavailable: true });
  await client.indices.create({
    index,
    mappings: {
      properties: {
        // 主字段 text 做检索，子字段 name.keyword 做精确排序/分页 tiebreaker
        name: { type: 'text', fields: { keyword: { type: 'keyword' } } },
        // brand/category 用 keyword：不分词，才能精确过滤和聚合。
        brand: { type: 'keyword' },
        category: { type: 'keyword' },
        price: { type: 'integer' },
        stock: { type: 'integer' },
        tags: { type: 'keyword' },
        createdAt: { type: 'date' },
      },
    },
  });

  const operations = PRODUCTS.flatMap((doc) => [{ index: { _index: index } }, doc]);
  await client.bulk({ operations, refresh: true });
}
