# Programming Language：TypeScript · Go · Python · Rust 横向对比

四个**独立可运行**的教学工程，用**同一套 15 个主题 + 1 个测试**分别演示 TypeScript、Go、Python、Rust 的用法。每个 demo 都把「表达式 → 结果」打印出来，跑一遍就能看到语言特性的真实行为。

四份实现刻意保持**主题一一对应、示例逐点对齐**，把同一个概念在四种语言里的写法摆在一起看，差异一目了然。四者都是**强类型**语言，但类型策略各异：TS/Python 是「静态类型注解 + 编译期/工具检查」，Go 是「编译期强制、无隐式转换」，Rust 更进一步用「所有权 + 借用」把内存安全也纳入类型系统。

```
Programming Language/
├── TypeScript/   npm run dev        （TS 5 + Node，tsc 编译后运行）
├── Go/           go run .           （Go 1.23，无第三方依赖）
├── Python/       python main.py     （Python 3.12+，无第三方依赖）
├── Rust/         cargo run          （Rust 2021，无第三方依赖）
└── README.md     ← 你在这里
```

## 一分钟跑起来

| 语言 | 跑全部 | 只跑某几个 | 测试 |
| --- | --- | --- | --- |
| TypeScript | `cd TypeScript && npm install && npm run dev` | `npm start generics async` | `npm test` |
| Go | `cd Go && go run .` | `go run . generics memory` | `go test ./...` |
| Python | `cd Python && python main.py` | `python main.py generics async` | `python -m unittest` |
| Rust | `cd Rust && cargo run` | `cargo run -- generics sorting` | `cargo test` |

## 主题对照表

> 文件名列出各语言对应的 demo；Rust 的文件都在 `Rust/src/demos/` 下。

| # | 主题 | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- | --- |
| 01 | 类型与变量 | `01-types.ts` | `types.go` | `d01_types.py` | `d01_types.rs` |
| 02 | 集合类型 | `02-collections.ts` | `collections.go` | `d02_collections.py` | `d02_collections.rs` |
| 03 | 函数 | `03-functions.ts` | `functions.go` | `d03_functions.py` | `d03_functions.rs` |
| 04 | 控制流 | `04-control-flow.ts` | `controlflow.go` | `d04_control_flow.py` | `d04_control_flow.rs` |
| 05 | 结构体·类·接口 | `05-structs-classes-interfaces.ts` | `structs.go` | `d05_classes.py` | `d05_structs_traits.rs` |
| 06 | 泛型 | `06-generics.ts` | `generics.go` | `d06_generics.py` | `d06_generics.rs` |
| 07 | 错误处理 | `07-error-handling.ts` | `errors.go` | `d07_errors.py` | `d07_errors.rs` |
| 08 | 并发与异步 | `08-async.ts` | `concurrency.go` | `d08_async.py` | `d08_concurrency.rs` |
| 09 | 高级类型 | `09-advanced-types.ts` | `advancedtypes.go` | `d09_advanced_types.py` | `d09_advanced_types.rs` |
| 10 | 装饰器·元编程 | `10-decorators.ts` | `reflection.go` | `d10_decorators.py` | `d10_macros.rs` |
| 11 | 内存·引用·指针 | `11-memory-references.ts` | `memory.go` | `d11_memory.py` | `d11_ownership.rs` |
| 12 | 标准库惯例 | `12-stdlib.ts` | `stdlib.go` | `d12_stdlib.py` | `d12_stdlib.rs` |
| 13 | 迭代器与生成器 | `13-iterators.ts` | `iterators.go` | `d13_iterators.py` | `d13_iterators.rs` |
| 14 | 模块·包·可见性 | `14-modules.ts` | `modules.go` + `internal/shapes/` | `d14_modules.py` + `mathlib.py` | `d14_modules.rs` |
| 15 | 自定义排序与相等性 | `15-sorting-equality.ts` | `sortingequality.go` | `d15_sorting_equality.py` | `d15_sorting_equality.rs` |
| 16 | 测试 | `tests/demo.test.ts` | `demos/mathx_test.go` | `tests/test_demos.py` | `src/mathx.rs` |

## 语言特性速查：同一件事，四种写法

### 变量与类型声明

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 声明 + 推断 | `const x = 42` | `x := 42` | `x = 42` | `let x = 42` |
| 显式标注 | `const x: number = 42` | `var x int = 42` | `x: int = 42` | `let x: i32 = 42` |
| 可变性 | `let` 可变 / `const` 不可变 | 默认可变 | 默认可变 | **默认不可变**，`let mut` 才可变 |
| 类型强度 | 静态，编译期擦除 | 静态，编译期强制 | 动态，注解靠工具检查 | 静态，编译期强制 |
| 隐式数值转换 | 有（都是 `number`） | **无**，必须显式转 | 有（`int`/`float` 自动） | **无**，用 `as` 显式转 |
| 整数上限 | 精度上限，大数用 `bigint` | 固定位宽 `int`/`int64` | **任意精度** | 固定位宽，溢出 `checked_`/`wrapping_` |

### 函数

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 多返回值 | 用元组 `[a, b]` | **原生** `(int, int)` | 用元组 `a, b` | 用元组 `(a, b)` |
| 可变参数 | `...args: T[]` | `args ...T` | `*args: T` | 无（用切片/`Vec`） |
| 默认值 | `x = 1` | 无（需自己判） | `x=1` / `**kwargs` | 无（用 `Option`） |
| 函数类型 | `(n: number) => number` | `func(int) int` | `Callable[[int], int]` | `impl Fn(i32) -> i32` |

### 数据结构与多态

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 数据容器 | `interface` / `class` | `struct` | `@dataclass` / `class` | `struct` + `impl` |
| 接口/协议 | `interface`（结构化） | `interface`（隐式实现） | `Protocol`（结构化） | `trait`（显式 `impl`） |
| 类型兼容 | **结构化**（看形状） | **结构化**（看方法集） | **结构化**（鸭子类型） | **名义**（要显式实现 trait） |
| 代码复用 | 继承 `extends` + 组合 | **只有组合**（嵌入） | 继承 + `super()` | **只有组合 + trait** |

多态上 TS/Go/Python 都偏**结构化**（满足形状即兼容）；Rust 是**名义**的（必须显式 `impl Trait for T`），但同样**没有类继承**，靠组合 + trait。

### 泛型

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 函数 | `function f<T>(x: T)` | `func F[T any](x T)` | `def f[T](x: T)`（3.12+） | `fn f<T>(x: T)` |
| 类型 | `class Stack<T>` | `type Stack[T any]` | `class Stack[T]` | `struct Stack<T>` |
| 约束 | `<T extends X>` | `[T cmp.Ordered]` / type set | `[T: Comparable]` | `<T: Trait>` / `where` |
| 实现方式 | 编译期擦除 | 字典传递 | 运行期擦除 | **单态化**（零成本） |

### 错误处理 —— 四种哲学

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 机制 | `throw` / `try-catch` | **错误即返回值** `if err != nil` | `raise` / `try-except` | **`Result<T,E>` + `?`** |
| 空值 | `null` / `undefined` | 零值 / `nil` | `None` | **`Option<T>`（无 null）** |
| 不可恢复 | `throw` | `panic` / `recover` | 未捕获的异常 | `panic!` |
| 惯用风格 | 异常，或仿 `Result` 联合 | 显式检查每个 `error` | EAFP：先做，出错再处理 | 类型强制处理，`?` 传播 |

### 并发模型

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 模型 | 单线程 + 事件循环 | **goroutine + channel** | `asyncio` 协程（受 GIL 限制） | **系统线程 + channel** |
| 启动 | `async/await` + `Promise` | `go f()` | `async/await` + `asyncio` | `thread::spawn` |
| 并发等待 | `Promise.all` | `sync.WaitGroup` | `asyncio.gather` / `TaskGroup` | `handle.join()` |
| 共享状态 | 无共享（单线程） | `Mutex` / channel | GIL 下需 `Lock` | `Arc<Mutex<T>>`，**竞争编译期挡下** |

### 元编程（主题 10 的四种路线）

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 手段 | TC39 **装饰器** `@deco` | **struct tag + 反射** | **装饰器** `@deco` | **宏** `macro_rules!` + `#[derive]` |
| 时机 | 运行时包装 | 运行时反射 | 运行时包装 | **编译期展开**（类型安全） |
| 典型用途 | 日志、缓存、DI、路由 | JSON 序列化、ORM、校验 | 日志、缓存、`@lru_cache` | 消除样板、`#[derive(Debug)]` |

### 内存与所有权（主题 11）

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 内存管理 | GC | GC | GC（引用计数 + 循环回收） | **所有权 + RAII，无 GC** |
| 原始值 | 按值 | 按值 | 不可变对象「重新绑定」 | 按值（`Copy`） |
| 对象/容器 | 按引用 | 结构体按值、slice/map 按引用 | 全部按引用 | **move（转移所有权）** |
| 显式指针/引用 | 无 | `*T` / `&`（无指针算术） | 无 | `&T` / `&mut T`（借用检查器） |
| 深拷贝 | `structuredClone()` | 手写 / 序列化 | `copy.deepcopy()` | `.clone()` |

### 迭代器与生成器（主题 13）

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 生成器/迭代器 | `function*` + `yield` | `func(yield func(T) bool)` | `def` + `yield` | `impl Iterator` + `next()` |
| 遍历协议 | `[Symbol.iterator]()` | **range-over-func（1.23）** | `__iter__` / `__next__` | `Iterator` trait |
| 惰性无限序列 | ✅ 惰性 | ✅ 惰性 | ✅ 惰性 | ✅ 惰性（`(1..).take(n)`） |
| 委托/拼接 | `yield*` | 手动 `for range` 转发 | `yield from` | `.chain(...)` |
| 物化成列表 | `[...gen]` | `slices.Collect(seq)` | `list(gen)` | `.collect()` |

### 模块 · 包 · 可见性（主题 14）

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 单元 | 一个文件 = 一个模块 | 一个目录 = 一个**包** | 一个文件 = 模块，目录 = 包 | `mod`（文件或内联），crate |
| 默认可见性 | 私有（需 `export`） | 私有（需大写） | **公开** | **私有**（需 `pub`） |
| 导出 | `export` / `export default` | **首字母大写** | `__all__` 约束 `import *` | `pub` |
| 引入 | `import` | `import` | `import` | `use` |
| 初始化钩子 | 模块顶层代码 | `init()` 函数 | 模块顶层代码 | 无（用 `once`/惰性静态） |

### 自定义排序与相等性（主题 15）

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| 排序入参 | 比较器 `(a,b)=>number` | 比较器 `cmp func → int` | **取键函数** `key=` | `sort_by_key` / `sort_by` |
| 多键 | 串联比较器 `a() \|\| b()` | `cmp.Or(...)`（1.22+） | 元组键 `(k1, -k2)` | `Ordering::then(...)` |
| 稳定性 | `sort` 稳定（ES2019+） | 需 `SortStableFunc` | `sorted` 稳定 | `sort` 稳定 / `sort_unstable` |
| 值相等 | 无重载，`===` 看引用 | 结构体 `==` 逐字段比 | `__eq__`（`dataclass` 自动） | `#[derive(PartialEq)]` |
| 可作键/哈希 | 引用身份，需自造 key | 可比较结构体直接作 map 键 | `__hash__`（`frozen` 自动） | `#[derive(Eq, Hash)]` |
| 自定义大小 | 手写比较器 | 手写 `cmp` 函数 | `@total_ordering` 补全 | `impl Ord` |

## 怎么用这四个项目

1. **挑一个主题**（比如泛型），把四个文件并排打开，对照着读注释。
2. **各自跑一遍**，对照终端里「表达式 → 结果」的实际输出。
3. **改一行再跑**，看类型检查器/编译器/运行时分别怎么反应 —— 这是体会「类型强度」差异最快的方式。尤其把 Rust 的所有权/借用报错和其它三门语言对照，最能感受设计取舍。

每个子目录的 `README.md` 里有该语言更细的说明、类型系统要点和工具链对照。
