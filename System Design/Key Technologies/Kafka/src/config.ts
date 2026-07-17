/**
 * Kafka 连接配置。
 *
 * 全部留空 —— 填哪个就用哪个，不填就走本地默认的 localhost:9092。
 * 两种填法，优先级从高到低：
 *   1. 环境变量 KAFKA_BROKERS / KAFKA_CLIENT_ID / KAFKA_SASL_*（见 .env.example）
 *   2. 直接改下面 CONFIG 里的字面量
 *
 * SASL / SSL 只有连云上带鉴权的集群才需要，本地 docker 裸跑不用管。
 */

export type SaslMechanism = 'plain' | 'scram-sha-256' | 'scram-sha-512';

export interface KafkaConfig {
  /** broker 地址列表，host:port。 */
  brokers?: string[];
  clientId?: string;
  ssl?: boolean;
  sasl?: { mechanism: SaslMechanism; username: string; password: string };
}

/** 想硬编码就改这里，否则留空用环境变量。 */
export const CONFIG: KafkaConfig = {
  brokers: undefined,
  clientId: undefined,
  ssl: undefined,
  sasl: undefined,
};

const DEFAULTS = { brokers: ['localhost:9092'], clientId: 'kafka-demo' };

/** 空字符串和未设置一样，都当作“没填”。 */
function env(name: string): string | undefined {
  const v = process.env[name];
  return v === undefined || v.trim() === '' ? undefined : v.trim();
}

/** 按 CONFIG → 环境变量 → 默认值的顺序解析出最终配置。 */
export function resolveConfig(): Required<Pick<KafkaConfig, 'brokers' | 'clientId'>> & KafkaConfig {
  const brokers =
    CONFIG.brokers ??
    env('KAFKA_BROKERS')
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) ??
    DEFAULTS.brokers;

  const user = env('KAFKA_SASL_USERNAME');
  const pass = env('KAFKA_SASL_PASSWORD');
  const sasl =
    CONFIG.sasl ??
    (user && pass
      ? { mechanism: (env('KAFKA_SASL_MECHANISM') as SaslMechanism) ?? 'plain', username: user, password: pass }
      : undefined);

  return {
    brokers,
    clientId: CONFIG.clientId ?? env('KAFKA_CLIENT_ID') ?? DEFAULTS.clientId,
    // SASL 一般都跑在 TLS 上，填了账号密码就默认开 SSL，除非显式关掉。
    ssl: CONFIG.ssl ?? (env('KAFKA_SSL') === 'true' ? true : sasl ? true : undefined),
    sasl,
  };
}

/** 打日志用，密码要打码。 */
export function describeConfig(): string {
  const c = resolveConfig();
  const auth = c.sasl ? ` (SASL ${c.sasl.mechanism} ${c.sasl.username}:***)` : '';
  const tls = c.ssl ? ' +TLS' : '';
  return `${c.brokers.join(',')}${tls}${auth}`;
}
