# Redis

TypeScript + [ioredis] 的 Redis 用法演示。每个 demo 打印出「发了什么命令 → 返回了什么」，跑一遍就能看到全部行为，不用去背文档。

## 跑起来

```bash
npm install

# 需要一个 Redis。本地没有的话：
docker run -d -p 6379:6379 redis:7-alpine
#   或 brew services start redis
#   或 redis-server --port 6379 --daemonize yes

npm run dev            # 编译 + 跑全部 10 个 demo
npm start zset lock    # 只跑指定的几个
```

跑完会自动删掉所有 `demo:*` 前缀的 key，不会在你的库里留垃圾。

## 连接配置

**默认留空**，直接连 `127.0.0.1:6379`。要连别的实例，三种填法任选（优先级从高到低）：

```bash
# 1. 整条 URL
REDIS_URL=redis://:password@10.0.0.1:6379/0 npm start

# 2. 分开填（cp .env.example .env 后填，或直接给环境变量）
REDIS_HOST=10.0.0.1 REDIS_PORT=6380 REDIS_PASSWORD=secret npm start
```

3. 或者直接改 `src/config.ts` 里的 `CONFIG` 字面量。

空字符串等同于没填，会继续往下走默认值。

## 内容

| Demo       | 文件                         | 重点                                                        |
| ---------- | ---------------------------- | ----------------------------------------------------------- |
| `string`   | `01-string.ts`               | SET/GET/INCR、`SET NX`、MSET/MGET、Cache-Aside              |
| `hash`     | `02-hash.ts`                 | 对象存储、HINCRBY 改单字段、HSCAN 增量遍历                  |
| `list`     | `03-list.ts`                 | FIFO/LIFO、LTRIM 定长、BLPOP 阻塞、LMOVE 可靠队列           |
| `set`      | `04-set.ts`                  | 去重、交并差、SPOP 抽奖、UV 统计                            |
| `zset`     | `05-zset.ts`                 | 排行榜、延时队列、滑动窗口限流                              |
| `expire`   | `06-expire.ts`               | TTL 语义、`SET` 冲掉 TTL 的坑、KEEPTTL、雪崩与抖动          |
| `pubsub`   | `07-pubsub.ts`               | 广播、离线即丢失、PSUBSCRIBE                                |
| `pipeline` | `08-pipeline-transaction.ts` | Pipeline 省 RTT、MULTI/EXEC、**事务不回滚**、WATCH 乐观锁   |
| `lock`     | `09-lua-lock.ts`             | EVAL 原子性、分布式锁（NX + TTL + Lua 校验 owner）、EVALSHA |
| `stream`   | `10-stream.ts`               | 持久化消息、消费组、XPENDING/XACK、XAUTOCLAIM 接管          |

## 几个容易踩的点

这些 demo 里都跑给你看了：

- **事务没有回滚。** MULTI 里某条命令运行时报错，其余命令照样生效 —— 它不是关系型数据库的事务。
- **`SET` 会清掉 TTL。** 覆盖写完 TTL 就没了，想保留得显式加 `KEEPTTL`。
- **Pipeline ≠ 事务。** Pipeline 只是把命令打包省网络往返，中间可以插进别人的命令；要原子性得用 MULTI 或 Lua。
- **解锁必须校验 owner。** 直接 `DEL` 可能删掉别人的锁：你的锁超时释放了，别人拿到了，你才慢悠悠来删。所以要用 Lua 把「比对 + 删除」做成一步。
- **Pub/Sub 会丢消息。** 发的时候没人在线就永远收不到，需要投递保证请用 Stream。
- **别在生产用 `KEYS`。** 它会阻塞整个 Redis（单线程）。用 `SCAN` 增量遍历，`cleanup()` 就是这么写的。

## 一条连接只能干一件事

`SUBSCRIBE` 之后连接进入订阅模式，除了订阅相关命令什么都不能发；`BLPOP` 会把连接占住直到超时。所以 `pubsub` 和 `list` 的 demo 里都用 `createClient()` 另开了连接。生产里的常见做法：一条连接发命令，另一条专门订阅。

[ioredis]: https://github.com/redis/ioredis
