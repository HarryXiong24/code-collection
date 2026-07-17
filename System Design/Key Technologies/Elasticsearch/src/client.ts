import { Client, type ClientOptions } from '@elastic/elasticsearch';
import { resolveConfig } from './config.js';

/**
 * 建一个 Elasticsearch client。client 内部维护一个连接池，线程安全，
 * 整个进程共享一个实例即可，不用像 Redis 的订阅那样另开连接。
 */
export function createClient(options: ClientOptions = {}): Client {
  const c = resolveConfig();

  const opts: ClientOptions = {
    // 连不上时别无限等，快速失败好让 demo 打印出提示。
    requestTimeout: 10_000,
    maxRetries: 2,
    ...options,
  };

  if (c.cloudId) opts.cloud = { id: c.cloudId };
  if (c.node) opts.node = c.node;

  if (c.apiKey) opts.auth = { apiKey: c.apiKey };
  else if (c.username && c.password) opts.auth = { username: c.username, password: c.password };

  // 自签证书跳过校验。仅用于本地，生产要配好 CA。
  if (!c.tlsRejectUnauthorized) opts.tls = { rejectUnauthorized: false };

  return new Client(opts);
}

/** demo 里所有索引都带前缀，跑完能一把删干净，也不会碰你现有的索引。 */
export const NS = 'demo';
export const index = (name: string): string => `${NS}-${name}`;

/**
 * 删掉所有 demo 索引。先按前缀列出真实名字，再逐个删。
 * 不直接 delete("demo-*")：ES 默认开了 action.destructive_requires_name，
 * 禁止用通配符批量删索引，防手滑删库。
 */
export async function cleanup(client: Client): Promise<string[]> {
  const existing = await client.indices.get({ index: `${NS}-*` }, { ignore: [404] }).catch(() => ({}));
  const names = Object.keys(existing as Record<string, unknown>);
  if (names.length > 0) {
    await client.indices.delete({ index: names, ignore_unavailable: true });
  }
  return names;
}
