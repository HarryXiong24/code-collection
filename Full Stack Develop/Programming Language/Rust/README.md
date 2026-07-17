# Rust

Rust 语言用法演示。每个 demo 打印出「表达式 → 结果」，跑一遍就能看到语言特性的真实行为，不用去背文档。

与同目录的 [`../TypeScript`](../TypeScript)、[`../Go`](../Go)、[`../Python`](../Python) 是**同一套主题、逐一对应**的四份实现，方便横向对比这几种强类型语言的写法差异。

## 跑起来

```bash
cargo run                     # 跑全部 15 个 demo
cargo run -- generics sorting # 只跑指定的几个（注意 -- 分隔）
cargo test                    # 跑单元测试（见 src/mathx.rs）
```

需要 Rust（`rustc` / `cargo`，装法：`brew install rust` 或官方 `rustup`）。无第三方依赖，纯标准库。

## 内容

| # | 文件 | 名字 | 重点 |
| --- | --- | --- | --- |
| 01 | `d01_types.rs` | `types` | `let`/`mut`、推断、`shadowing`、整数溢出、`as` 显式转换、`char`/元组 |
| 02 | `d02_collections.rs` | `collections` | 数组 vs `Vec`、切片 `&[T]`、`HashMap`/`HashSet`、迭代器链 |
| 03 | `d03_functions.rs` | `functions` | 表达式返回、闭包 + `move`、`impl Fn` 高阶函数、无默认参数 |
| 04 | `d04_control_flow.rs` | `control-flow` | `if`/`loop` 是表达式、`match` 穷尽匹配、守卫、范围、`if let` |
| 05 | `d05_structs_traits.rs` | `structs` | `struct` + `impl`、`#[derive]`、`trait` + 默认方法、组合替代继承 |
| 06 | `d06_generics.rs` | `generics` | 泛型函数/结构体、trait 约束、`where`、单态化 |
| 07 | `d07_errors.rs` | `errors` | `Result<T,E>`、`?` 运算符、自定义错误枚举、`Option` 代替 null |
| 08 | `d08_concurrency.rs` | `concurrency` | `thread::spawn`、`mpsc` channel、`Arc<Mutex<T>>`、无畏并发 |
| 09 | `d09_advanced_types.rs` | `advanced-types` | 带数据的枚举（ADT）、`Box<dyn Trait>`、newtype、类型别名 |
| 10 | `d10_macros.rs` | `macros` | `macro_rules!` 声明宏、递归宏、`#[derive]` 派生宏 |
| 11 | `d11_ownership.rs` | `ownership` | **所有权、move、借用 `&`/`&mut`、Copy vs Clone**（Rust 核心） |
| 12 | `d12_stdlib.rs` | `stdlib` | `String`/`&str`、字符串方法、`parse`/`format!`、`HashMap` entry |
| 13 | `d13_iterators.rs` | `iterators` | `Iterator` trait、惰性适配器、自定义迭代器、无限序列 + `take` |
| 14 | `d14_modules.rs` | `modules` | `mod`、默认私有 + `pub`、路径 `::`、`use`、crate |
| 15 | `d15_sorting_equality.rs` | `sorting` | `sort_by_key`/`sort_by`、`Ordering::then`、`derive` 相等/哈希、自定义 `Ord` |
| 16 | `src/mathx.rs` | — | 内置测试框架 `#[cfg(test)]` + `#[test]`，表驱动（用 `cargo test` 跑） |

## 类型系统要点（Rust 的取舍）

- **所有权 + 借用**：内存安全在**编译期**由类型系统保证，没有 GC，也没有悬垂指针/双重释放/数据竞争（见 `11`）。这是 Rust 区别于另外三门语言的根本点。
- **没有 null**：用 `Option<T>` 表达「可能没有」，用 `Result<T,E>` 表达「可能失败」，编译器强制你处理（见 `07`）。
- **枚举是代数数据类型**：变体可带数据，配 `match` 穷尽匹配，是建模的利器（见 `09`）。
- **trait 而非继承**：能力用 trait 描述，复用靠组合 + trait，没有类继承（见 `05`）。对应 Go 的接口、TS 的 interface、Python 的 Protocol。
- **零成本抽象**：泛型单态化、迭代器适配器编译后和手写循环一样快（见 `06`/`13`）。

## 工具链

| 用途 | 工具 |
| --- | --- |
| 工具链管理 | `rustup`（或 `brew install rust`） |
| 构建 / 运行 / 依赖 | `cargo`（`Cargo.toml` 声明依赖，`crates.io` 是生态仓库） |
| 测试 | 内置 `cargo test`（`#[test]` / `#[cfg(test)]`，无需第三方） |
| 格式化 | `cargo fmt`（官方唯一风格） |
| 静态检查 | `cargo clippy`（官方 lint，建议开） |
