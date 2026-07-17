/**
 * Elasticsearch 连接配置。
 *
 * 这里全部留空 —— 填哪个就用哪个，不填就走本地默认的 http://localhost:9200（无认证）。
 * 三种填法，优先级从高到低：
 *   1. 直接改下面 CONFIG 里的字面量
 *   2. 环境变量 ES_NODE / ES_API_KEY / ES_USERNAME / ES_PASSWORD / ES_CLOUD_ID
 *   3. 都不填 → http://localhost:9200
 *
 * 认证三选一：apiKey 优先，其次 username+password，都没有就当无认证集群。
 * Elastic Cloud 用户填 cloudId 就不用再填 node。
 */

export interface EsConfig {
  /** 节点地址，例如 http://localhost:9200 或 https://es.internal:9200。 */
  node?: string;
  /** Elastic Cloud 的 Cloud ID。填了它可以不填 node。 */
  cloudId?: string;
  /** API Key（Base64 串）。填了它就忽略下面的用户名密码。 */
  apiKey?: string;
  username?: string;
  password?: string;
  /** 自签证书时设为 false 跳过校验。生产别关。 */
  tlsRejectUnauthorized?: boolean;
}

/** 想硬编码就改这里，否则留空用环境变量。 */
export const CONFIG: EsConfig = {
  node: undefined,
  cloudId: undefined,
  apiKey: undefined,
  username: undefined,
  password: undefined,
  tlsRejectUnauthorized: undefined,
};

const DEFAULTS = { node: 'http://localhost:9200' } as const;

/** 空字符串和未设置一样，都当作"没填"。 */
function env(name: string): string | undefined {
  const v = process.env[name];
  return v === undefined || v.trim() === '' ? undefined : v.trim();
}

function envBool(name: string): boolean | undefined {
  const v = env(name);
  if (v === undefined) return undefined;
  return v !== 'false' && v !== '0';
}

export interface ResolvedConfig {
  node?: string;
  cloudId?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  tlsRejectUnauthorized: boolean;
}

/** 按 CONFIG → 环境变量 → 默认值的顺序解析出最终配置。 */
export function resolveConfig(): ResolvedConfig {
  const cloudId = CONFIG.cloudId ?? env('ES_CLOUD_ID');
  // 有 cloudId 时 node 交给 client 从 cloudId 推导，不再兜底本地地址。
  const node = CONFIG.node ?? env('ES_NODE') ?? (cloudId ? undefined : DEFAULTS.node);
  return {
    node,
    cloudId,
    apiKey: CONFIG.apiKey ?? env('ES_API_KEY'),
    username: CONFIG.username ?? env('ES_USERNAME'),
    password: CONFIG.password ?? env('ES_PASSWORD'),
    tlsRejectUnauthorized:
      CONFIG.tlsRejectUnauthorized ?? envBool('ES_TLS_REJECT_UNAUTHORIZED') ?? true,
  };
}

/** 打日志用，密码和 key 要打码。 */
export function describeConfig(): string {
  const c = resolveConfig();
  const target = c.cloudId ? `cloud:${c.cloudId.slice(0, 12)}…` : (c.node ?? DEFAULTS.node);
  let auth = '(无认证)';
  if (c.apiKey) auth = 'apiKey ***';
  else if (c.username) auth = `${c.username}:***`;
  return `${target}  [${auth}]`;
}
