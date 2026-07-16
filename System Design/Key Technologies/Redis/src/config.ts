/**
 * Redis 连接配置。
 *
 * 这里全部留空 —— 填哪个就用哪个，不填就走本地默认的 127.0.0.1:6379。
 * 三种填法，优先级从高到低：
 *   1. 环境变量 REDIS_URL，例如 redis://:password@10.0.0.1:6379/0
 *   2. 环境变量 REDIS_HOST / REDIS_PORT / REDIS_PASSWORD / REDIS_DB
 *   3. 直接改下面 CONFIG 里的字面量
 */

export interface RedisConfig {
  /** 整条连接串。填了它，下面的 host/port/password/db 全部忽略。 */
  url?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  db?: number;
}

/** 想硬编码就改这里，否则留空用环境变量。 */
export const CONFIG: RedisConfig = {
  url: undefined,
  host: undefined,
  port: undefined,
  username: undefined,
  password: undefined,
  db: undefined,
};

const DEFAULTS = { host: '127.0.0.1', port: 6379, db: 0 } as const;

/** 空字符串和未设置一样，都当作"没填"。 */
function env(name: string): string | undefined {
  const v = process.env[name];
  return v === undefined || v.trim() === '' ? undefined : v.trim();
}

function envInt(name: string): number | undefined {
  const v = env(name);
  if (v === undefined) return undefined;
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) throw new Error(`环境变量 ${name} 不是合法整数: ${v}`);
  return n;
}

/** 按 CONFIG → 环境变量 → 默认值的顺序解析出最终配置。 */
export function resolveConfig(): Required<Pick<RedisConfig, 'host' | 'port' | 'db'>> & RedisConfig {
  const url = CONFIG.url ?? env('REDIS_URL');
  return {
    url,
    host: CONFIG.host ?? env('REDIS_HOST') ?? DEFAULTS.host,
    port: CONFIG.port ?? envInt('REDIS_PORT') ?? DEFAULTS.port,
    username: CONFIG.username ?? env('REDIS_USERNAME'),
    password: CONFIG.password ?? env('REDIS_PASSWORD'),
    db: CONFIG.db ?? envInt('REDIS_DB') ?? DEFAULTS.db,
  };
}

/** 打日志用，密码要打码。 */
export function describeConfig(): string {
  const c = resolveConfig();
  if (c.url) return c.url.replace(/:\/\/([^:@/]*):([^@/]*)@/, '://$1:***@');
  const auth = c.password ? `${c.username ?? ''}:***@` : '';
  return `redis://${auth}${c.host}:${c.port}/${c.db}`;
}
