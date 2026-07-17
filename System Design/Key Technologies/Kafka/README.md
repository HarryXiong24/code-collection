# Kafka 用法演示

TypeScript + [KafkaJS](https://kafka.js.org/) 写的一组可运行示例，覆盖 Kafka 日常开发最常打交道的能力：主题管理、生产/消费、按 key 分区、消费组再均衡、offset 提交与重放、幂等生产者、事务（Exactly-Once）。

每个 demo 都是独立的一段，自己建 topic、自己产消，跑完统一清理。可以一把跑完，也可以只跑感兴趣的几个。

## 快速开始

需要一个能连的 Kafka broker。本地起一个最省事：

```bash
# 单 broker，KRaft 模式（不需要 ZooKeeper），监听 localhost:9092
docker run -d --name kafka -p 9092:9092 apache/kafka:3.9.0
```

然后：

```bash
npm install
npm run dev          # = build + start，跑全部 demo
```

默认连 `localhost:9092`。要连别的集群，把 `.env.example` 复制成 `.env` 填 `KAFKA_BROKERS`，或直接改 `src/config.ts` 里的 `CONFIG`。云上带鉴权的集群再填 `KAFKA_SASL_*`。

## 只跑指定的 demo

```bash
npm run build
npm start                    # 全部
npm start group offset       # 只跑消费组和 offset 两个
```

可选名字：`admin` `produce` `consume` `partition` `group` `offset` `idempotent` `transaction`

## Demo 一览

| 名字          | 文件                          | 讲什么                                                       |
| ------------- | ----------------------------- | ------------------------------------------------------------ |
| `admin`       | `01-admin.ts`                 | 主题增删查、扩分区；分区只能加不能减                          |
| `produce`     | `02-produce.ts`               | 单条/批量发送、key、headers，读 RecordMetadata 看落在哪      |
| `consume`     | `03-consume.ts`               | 消费组基本消费，`eachMessage` 回调与自动提交                 |
| `partition`   | `04-partition.ts`             | key 决定分区；顺序只在单分区内成立                           |
| `group`       | `05-consumer-group.ts`        | 一组两个消费者瓜分分区，读 `GROUP_JOIN` 看真实分配结果       |
| `offset`      | `06-offset.ts`                | 手动提交进度、`seek` 把游标拨回去重放历史                    |
| `idempotent`  | `07-idempotent.ts`            | 幂等生产者去重、`acks=all` 不丢消息                          |
| `transaction` | `08-transaction.ts`           | 事务原子写：commit 可见 / abort 蒸发，read-committed 隔离    |

## 几个容易踩的点

- **顺序性只在单个分区内成立**，不是全局。要让某个实体（用户、订单）的事件保序，就拿它的 id 当 key —— 相同 key 恒进同一分区。
- **分区数 = 消费并行度上限**。一个分区同一时刻只归组内一个消费者，消费者多过分区就有人空转。
- **offset 指向“下一条要读的位置”**，不是最后读到的那条。消息被消费不会删除，所以可以 `seek` 回放。
- **幂等 ≠ 事务**。幂等只保证单 producer、单分区不因重试而重复；跨分区/跨 topic 的原子性要用事务。
- **事务要消费端配合**：消费者 `readUncommitted: false`（KafkaJS 默认）才会把 abort 掉的消息隔离掉。

## 结构

```
src/
  config.ts     连接配置（CONFIG → 环境变量 → 默认 localhost:9092）
  client.ts     createKafka / createProducer / collect / cleanup 等公共件
  log.ts        终端上色输出
  index.ts      入口：连接、按参数选 demo、跑完清理
  demos/        八个 demo，编号即上表顺序
```

> 说明：KafkaJS 首次连接时内部超时计算会冒一条 `TimeoutNegativeWarning`，是库本身的已知无害噪音，`index.ts` 里已经把这一条单独过滤掉，其余 warning 照常打印。
