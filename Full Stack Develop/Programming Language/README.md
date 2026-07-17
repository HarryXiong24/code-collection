# Programming Language：TypeScript · Go · Python 横向对比

三个**独立可运行**的教学工程，用**同一套 15 个主题 + 1 个测试**分别演示 TypeScript、Go、Python 的用法。每个 demo 都把「表达式 → 结果」打印出来，跑一遍就能看到语言特性的真实行为。

三份实现刻意保持**主题一一对应、示例逐点对齐**，把同一个概念在三种语言里的写法摆在一起看，差异一目了然。三者都是**强类型**语言，因此每个主题都不回避类型：TS/Python 是「静态类型注解 + 编译期/工具检查」，Go 是「编译期强制、无隐式转换」。

```
Programming Language/
├── TypeScript/   npm run dev        （TS 5 + Node，tsc 编译后运行）
├── Go/           go run .           （Go 1.23，无第三方依赖）
├── Python/       python main.py     （Python 3.12+，无第三方依赖）
└── README.md     ← 你在这里
```

## 一分钟跑起来

| 语言 | 跑全部 | 只跑某几个 | 测试 |
| --- | --- | --- | --- |
| TypeScript | `cd TypeScript && npm install && npm run dev` | `npm start generics async` | `npm test` |
| Go | `cd Go && go run .` | `go run . generics memory` | `go test ./...` |
| Python | `cd Python && python main.py` | `python main.py generics async` | `python -m unittest` |

## 主题对照表

| # | 主题 | TypeScript | Go | Python |
| --- | --- | --- | --- | --- |
| 01 | 类型与变量 | `01-types.ts` | `types.go` | `d01_types.py` |
| 02 | 集合类型 | `02-collections.ts` | `collections.go` | `d02_collections.py` |
| 03 | 函数 | `03-functions.ts` | `functions.go` | `d03_functions.py` |
| 04 | 控制流 | `04-control-flow.ts` | `controlflow.go` | `d04_control_flow.py` |
| 05 | 结构体·类·接口 | `05-structs-classes-interfaces.ts` | `structs.go` | `d05_classes.py` |
| 06 | 泛型 | `06-generics.ts` | `generics.go` | `d06_generics.py` |
| 07 | 错误处理 | `07-error-handling.ts` | `errors.go` | `d07_errors.py` |
| 08 | 并发与异步 | `08-async.ts` | `concurrency.go` | `d08_async.py` |
| 09 | 高级类型 | `09-advanced-types.ts` | `advancedtypes.go` | `d09_advanced_types.py` |
| 10 | 装饰器·元编程 | `10-decorators.ts` | `reflection.go` | `d10_decorators.py` |
| 11 | 内存·引用·指针 | `11-memory-references.ts` | `memory.go` | `d11_memory.py` |
| 12 | 标准库惯例 | `12-stdlib.ts` | `stdlib.go` | `d12_stdlib.py` |
| 13 | 迭代器与生成器 | `13-iterators.ts` | `iterators.go` | `d13_iterators.py` |
| 14 | 模块·包·可见性 | `14-modules.ts` | `modules.go` + `internal/shapes/` | `d14_modules.py` + `mathlib.py` |
| 15 | 自定义排序与相等性 | `15-sorting-equality.ts` | `sortingequality.go` | `d15_sorting_equality.py` |
| 16 | 测试 | `tests/demo.test.ts` | `demos/mathx_test.go` | `tests/test_demos.py` |

## 语言特性速查：同一件事，三种写法

### 变量与类型声明

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 声明 + 推断 | `const x = 42` | `x := 42` | `x = 42` |
| 显式标注 | `const x: number = 42` | `var x int = 42` | `x: int = 42` |
| 类型强度 | 静态，编译期擦除 | 静态，编译期强制 | 动态，注解靠工具检查 |
| 隐式数值转换 | 有（都是 `number`） | **无**，必须显式转 | 有（`int`/`float` 自动） |
| 整数上限 | `number` 有精度上限，大数用 `bigint` | 固定位宽 `int`/`int64` | **任意精度** |

### 函数

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 多返回值 | 用元组 `[a, b]` | **原生** `(int, int)` | 用元组 `a, b` |
| 可变参数 | `...args: T[]` | `args ...T` | `*args: T` |
| 默认值 | `x = 1` | 无（需自己判） | `x=1` / `**kwargs` |
| 函数类型 | `(n: number) => number` | `func(int) int` | `Callable[[int], int]` |

### 数据结构与多态

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 数据容器 | `interface` / `class` | `struct` | `@dataclass` / `class` |
| 接口/协议 | `interface`（结构化） | `interface`（隐式实现） | `Protocol`（结构化） |
| 类型兼容 | **结构化**（看形状） | **结构化**（看方法集） | **结构化**（鸭子类型） |
| 代码复用 | 继承 `extends` + 组合 | **只有组合**（嵌入） | 继承 + `super()` |

三种语言都倾向**结构化类型**：满足形状/方法即兼容，不看名字。Go 更进一步，完全没有继承。

### 泛型

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 函数 | `function f<T>(x: T)` | `func F[T any](x T)` | `def f[T](x: T)`（3.12+） |
| 类型 | `class Stack<T>` | `type Stack[T any]` | `class Stack[T]` |
| 约束 | `<T extends X>` | `[T cmp.Ordered]` / type set | `[T: Comparable]` |

### 错误处理 —— 三种截然不同的哲学

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 机制 | `throw` / `try-catch` | **错误即返回值** `if err != nil` | `raise` / `try-except` |
| 不可恢复 | `throw` | `panic` / `recover` | 未捕获的异常 |
| 惯用风格 | 异常，或仿 `Result` 联合 | 显式检查每个 `error` | EAFP：先做，出错再处理 |

### 并发模型

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 模型 | 单线程 + 事件循环 | **goroutine + channel** | `asyncio` 协程（受 GIL 限制） |
| 启动 | `async/await` + `Promise` | `go f()` | `async/await` + `asyncio` |
| 并发等待 | `Promise.all` | `sync.WaitGroup` | `asyncio.gather` / `TaskGroup` |
| CPU 密集 | 卡事件循环，用 Worker | goroutine 跑满多核 | 用多进程绕开 GIL |

### 元编程（主题 10 的三种路线）

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 手段 | TC39 **装饰器** `@deco` | **struct tag + 反射** | **装饰器** `@deco` |
| 典型用途 | 日志、缓存、DI、路由注册 | JSON 序列化、ORM、参数校验 | 日志、缓存、`@lru_cache` |

### 内存与引用语义（主题 11）

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 原始值 | 按值 | 按值 | 不可变对象「重新绑定」 |
| 对象/容器 | 按引用 | 结构体按值、slice/map 按引用 | 全部按引用 |
| 显式指针 | 无 | **有** `*T` / `&`（无指针算术） | 无 |
| 深拷贝 | `structuredClone()` | 手写 / 序列化 | `copy.deepcopy()` |

### 迭代器与生成器（主题 13）

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 生成器 | `function*` + `yield` | `func(yield func(T) bool)` | `def` + `yield` |
| 遍历协议 | `[Symbol.iterator]()` | **range-over-func（1.23）** | `__iter__` / `__next__` |
| 惰性无限序列 | ✅ 惰性 | ✅ 惰性 | ✅ 惰性 |
| 委托/拼接 | `yield*` | 手动 `for range` 转发 | `yield from` |
| 物化成列表 | `[...gen]` | `slices.Collect(seq)` | `list(gen)` |

### 模块 · 包 · 可见性（主题 14）

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 单元 | 一个文件 = 一个模块 | 一个目录 = 一个**包** | 一个文件 = 模块，目录 = 包 |
| 导出 | `export` / `export default` | **首字母大写**（无关键字） | 默认全公开，`__all__` 约束 `import *` |
| 私有 | 不 `export` 即私有 | 首字母小写 | `_name` 仅约定、非强制 |
| 强制边界 | 无 | `internal/` 目录 | 无 |
| 初始化钩子 | 模块顶层代码 | `init()` 函数 | 模块顶层代码 |

### 自定义排序与相等性（主题 15）

| | TypeScript | Go | Python |
| --- | --- | --- | --- |
| 排序入参 | 比较器 `(a,b)=>number` | 比较器 `cmp func → int` | **取键函数** `key=` |
| 多键 | 串联比较器 `a() \|\| b()` | `cmp.Or(...)`（1.22+） | 元组键 `(k1, -k2)` |
| 稳定性 | `sort` 稳定（ES2019+） | 需用 `SortStableFunc` | `sorted` 稳定 |
| 值相等 | 无重载，`===` 看引用 | 结构体 `==` 逐字段比 | `__eq__`（`dataclass` 自动） |
| 可作键/哈希 | 引用身份，需自造 key | 可比较结构体直接作 map 键 | `__hash__`（`frozen` 自动） |
| 自定义大小 | 手写比较器 | 手写 `cmp` 函数 | `@total_ordering` 补全 |

## 怎么用这三个项目

1. **挑一个主题**（比如泛型），把三个文件并排打开，对照着读注释。
2. **各自跑一遍**，对照终端里「表达式 → 结果」的实际输出。
3. **改一行再跑**，看类型检查器/编译器/运行时分别怎么反应 —— 这是体会「类型强度」差异最快的方式。

每个子目录的 `README.md` 里有该语言更细的说明、类型系统要点和工具链对照。
