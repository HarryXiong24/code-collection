# Elasticsearch

TypeScript + [@elastic/elasticsearch] 官方客户端的 Elasticsearch 用法演示。每个 demo 打印出「做了什么操作 → 返回了什么」，跑一遍就能看到全部行为，不用去背文档。

## 跑起来

```bash
npm install

# 需要一个 Elasticsearch。本地没有的话（单节点、关掉认证，方便 demo）：
docker run -d -p 9200:9200 \
  -e discovery.type=single-node \
  -e xpack.security.enabled=false \
  elasticsearch:8.14.0

npm run dev              # 编译 + 跑全部 6 个 demo
npm start search agg     # 只跑指定的几个
```

跑完会自动删掉所有 `demo-*` 前缀的索引，不会在你的集群里留垃圾。

## 连接配置

**默认留空**，直接连 `http://localhost:9200`（无认证）。要连别的集群，两种填法任选（优先级从高到低）：

```bash
# 1. 环境变量（cp .env.example .env 后填，或直接给）
ES_NODE=https://es.internal:9200 ES_API_KEY=xxxx npm start
ES_NODE=https://es.internal:9200 ES_USERNAME=elastic ES_PASSWORD=secret npm start

# Elastic Cloud：
ES_CLOUD_ID=my-deployment:xxxx ES_API_KEY=xxxx npm start

# 本地自签证书懒得配 CA，跳过校验（生产别这么干）：
ES_TLS_REJECT_UNAUTHORIZED=false npm start
```

2. 或者直接改 `src/config.ts` 里的 `CONFIG` 字面量。

认证三选一：`apiKey` 优先，其次 `username` + `password`，都没填就当无认证集群。空字符串等同于没填，会继续往下走默认值。

## 内容

| Demo      | 文件                     | 重点                                                             |
| --------- | ------------------------ | ---------------------------------------------------------------- |
| `crud`    | `01-index-crud.ts`       | index/get/update/delete、写入非实时、\_version 乐观并发          |
| `bulk`    | `02-bulk.ts`             | 批量写入、部分失败语义、遍历 items 查错、helpers.bulk            |
| `search`  | `03-search.ts`           | match 全文检索 vs term 精确匹配、range、bool（must/filter/should）|
| `agg`     | `04-aggregation.ts`      | metric 指标聚合、terms 分组、嵌套子聚合、query+aggs、range 桶     |
| `page`    | `05-pagination.ts`       | from/size 的深翻限制、search_after 游标深分页                    |
| `mapping` | `06-mapping-analyzer.ts` | text vs keyword、\_analyze 看分词、多字段（fields）、getMapping   |

## 几个容易踩的点

这些 demo 里都跑给你看了：

- **写入不是实时可搜的。** ES 默认每秒才 refresh 一次，把新文档刷进可搜的段。想立刻读要么用 `get`（按 \_id 直取，实时），要么写入时带 `refresh`——但生产别每次都刷，很贵。
- **`text` 和 `keyword` 是两回事。** text 会分词、能全文检索但不能精确聚合排序；keyword 整存、能精确匹配和聚合但不做全文检索。对 text 字段用 `term` 经常查不到，因为存的是分词后的词元。
- **过滤条件放 `filter` 而不是 `must`。** filter 不参与相关性打分，结果可被缓存，比 must 快。
- **`from/size` 不能深翻。** `from+size` 默认上限 1 万，深翻每个分片都要取 from+size 条再汇总，越翻越慢。「导出全部 / 无限下拉」要用 `search_after`。
- **`search_after` 的排序要带唯一字段。** 排序值不唯一时翻页会漏/重，加个 `_id` 兜底保证顺序稳定。
- **bulk 是部分成功语义。** 某条失败不影响其它条，`errors` 只告诉你「有没有错」，具体哪条错要自己遍历 `items`。

## 一个 client 全程共用

和 Redis 的订阅连接不同，ES client 内部维护连接池、线程安全，整个进程共享一个实例即可，不用为不同操作另开连接。用完 `client.close()` 释放。

[@elastic/elasticsearch]: https://github.com/elastic/elasticsearch-js
