import type { Client } from '@elastic/elasticsearch';
import { index } from '../client.js';
import { cmd, note, title } from '../log.js';

/**
 * 文档 CRUD —— ES 的基本单位是「文档」（一个 JSON），存在「索引」里。
 * 类比关系型数据库：索引 ≈ 表，文档 ≈ 行，但没有固定 schema（mapping 可动态生成）。
 *
 * 关键点：写入不是立刻可搜的。ES 每隔 refresh_interval（默认 1s）才把新文档
 * 刷进可搜的段里，所以下面写完想马上读要么用 GET（按 _id 直取，实时），
 * 要么带 refresh 参数强制刷新。
 */
export async function crudDemo(client: Client): Promise<void> {
  title('文档 CRUD：index / get / update / delete');

  const idx = index('crud');
  await client.indices.delete({ index: idx, ignore_unavailable: true });
  await client.indices.create({ index: idx });

  note('index：写入一个文档，指定 _id。同 _id 再写就是整篇覆盖');
  const created = await client.index({
    index: idx,
    id: '1',
    document: { name: 'Harry', role: 'dev', level: 3 },
    refresh: true, // demo 里强制刷新，生产别每次都刷，很贵
  });
  cmd('index id=1', { result: created.result, version: created._version });

  note('get：按 _id 直取，绕过搜索，永远读到最新版本');
  const got = await client.get<{ name: string; role: string; level: number }>({ index: idx, id: '1' });
  cmd('get id=1', got._source);

  note('update：局部更新，只改传进去的字段，其余不动（底层是取出→合并→重写）');
  const updated = await client.update({
    index: idx,
    id: '1',
    doc: { level: 4 },
    refresh: true,
  });
  cmd('update id=1 level→4', { result: updated.result, version: updated._version });
  cmd('get id=1', (await client.get<{ level: number }>({ index: idx, id: '1' }))._source);

  note('每次写入 _version 自增，可用于乐观并发控制（if_seq_no / if_primary_term）');
  const doc = await client.get({ index: idx, id: '1' });
  cmd('当前 seq_no / primary_term', { seq_no: doc._seq_no, primary_term: doc._primary_term });

  note('delete：按 _id 删。删不存在的会抛 404');
  const deleted = await client.delete({ index: idx, id: '1', refresh: true });
  cmd('delete id=1', deleted.result);

  const exists = await client.exists({ index: idx, id: '1' });
  cmd('exists id=1', exists);
}
