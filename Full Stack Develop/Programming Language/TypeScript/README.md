# TypeScript

TypeScript 语言用法演示。每个 demo 打印出「表达式 → 结果」，跑一遍就能看到语言特性的真实行为，不用去背文档。

与同目录的 [`../Go`](../Go) 和 [`../Python`](../Python) 是**同一套主题、逐一对应**的三份实现，方便横向对比三种强类型语言的写法差异。

## 跑起来

```bash
npm install

npm run dev              # 编译 + 跑全部 15 个 demo
npm start generics async # 只跑指定的几个
npm test                 # 跑 node:test 单元测试
```

需要 Node ≥ 18（用到内置 `node:test`、`structuredClone`）。TypeScript 只在编译期存在，`tsc` 把 `src/*.ts` 编成 `dist/*.js`，实际运行的是 Node。

## 内容

| # | Demo | 名字 | 重点 |
| --- | --- | --- | --- |
| 01 | `01-types.ts` | `types` | 原始类型、`let/const`、标注 vs 推断、`bigint`、`null/undefined`、`as const` |
| 02 | `02-collections.ts` | `collections` | 数组 / 元组 / `Record` / `Map` / `Set`、解构与展开 |
| 03 | `03-functions.ts` | `functions` | 默认值 / 可选 / 剩余参数、箭头函数、闭包、高阶函数、重载 |
| 04 | `04-control-flow.ts` | `control-flow` | `if`/三元、`for...of`、可辨识联合 + 穷尽 `switch`、真值陷阱 |
| 05 | `05-structs-classes-interfaces.ts` | `classes` | `interface`/`type`、`class`、访问修饰符、继承、结构化类型 |
| 06 | `06-generics.ts` | `generics` | 泛型函数 / 类、约束 `extends`、`keyof`、工具类型 |
| 07 | `07-error-handling.ts` | `errors` | `try/catch/finally`、自定义 `Error`、`Result` 联合类型 |
| 08 | `08-async.ts` | `async` | `async/await`、`Promise.all`/`allSettled`/`race`、超时与取消 |
| 09 | `09-advanced-types.ts` | `advanced-types` | 联合/交叉、字面量枚举、类型收窄、类型守卫、映射类型 |
| 10 | `10-decorators.ts` | `decorators` | TC39 标准装饰器：方法/类装饰器、日志、记忆化 |
| 11 | `11-memory-references.ts` | `memory` | 值 vs 引用、浅拷贝 / 深拷贝 `structuredClone`、传参语义 |
| 12 | `12-stdlib.ts` | `stdlib` | JSON、`Date`、字符串、`Intl`、数组/对象工具 |
| 13 | `13-iterators.ts` | `iterators` | 生成器 `function*`、`[Symbol.iterator]`、惰性无限序列、`yield*` |
| 14 | `14-modules.ts` | `modules` | ESM 导入导出、默认 vs 具名、模块私有、`import type`、`import.meta` |
| 15 | `15-sorting-equality.ts` | `sorting` | 比较器组合子、多键排序、稳定性、引用相等、按值造 key 去重 |
| 16 | `tests/demo.test.ts` | — | `node:test` + `node:assert`，表驱动测试（用 `npm test` 跑） |

## 类型系统要点（这也是选 TS 的理由）

- **结构化类型（duck typing）**：形状对得上就兼容，不看是不是同一个声明。这点和 Go 的接口一致，和 Python 的 `Protocol` 一致，但和「按名字」的名义类型语言不同。
- **类型只在编译期存在**：运行时被完全擦除，不影响性能，也意味着不能在运行时 `instanceof SomeInterface`。
- **`strict` 一定要开**：`tsconfig.json` 里的 `strict` + `noUncheckedIndexedAccess` 能在编译期挡住绝大多数 `undefined` 类的 bug。
- **可辨识联合 + `never` 穷尽检查**：给联合的每个成员一个字面量 `kind`，`switch` 的 `default` 里赋值给 `never`，将来漏了分支会直接编译报错（见 `04`）。

## 工具链

| 用途 | 工具 |
| --- | --- |
| 包管理 | `npm`（或 pnpm / yarn / bun），依赖写在 `package.json` |
| 编译 | `tsc`（TypeScript 官方编译器），配置在 `tsconfig.json` |
| 直接跑 TS | `tsx` / `ts-node`（本项目走「先编译再 node」的经典路线） |
| 测试 | 内置 `node:test`（本项目）、或 Vitest / Jest |
| 格式化 / Lint | Prettier + ESLint（仓库根已有 `.prettierrc`） |
