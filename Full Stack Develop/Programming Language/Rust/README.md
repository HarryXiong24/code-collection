# Rust

A demonstration of Rust usage. Every demo prints "expression → result", so a single run shows you the real behavior of each language feature without memorizing docs.

Together with [`../TypeScript`](../TypeScript), [`../Go`](../Go), and [`../Python`](../Python) in the same directory, these are four implementations of **the same set of topics, one-to-one aligned**, making it easy to compare how these strongly typed languages differ.

## Run it

```bash
cargo run                     # run all 15 demos
cargo run -- generics sorting # run only the specified ones (note the -- separator)
cargo test                    # run the unit tests (see src/mathx.rs)
```

Requires Rust (`rustc` / `cargo`; install via `brew install rust` or the official `rustup`). No third-party dependencies, standard library only.

## Contents

| # | File | Name | Focus |
| --- | --- | --- | --- |
| 01 | `d01_types.rs` | `types` | `let`/`mut`, inference, `shadowing`, integer overflow, `as` explicit conversion, `char`/tuples |
| 02 | `d02_collections.rs` | `collections` | array vs `Vec`, slice `&[T]`, `HashMap`/`HashSet`, iterator chains |
| 03 | `d03_functions.rs` | `functions` | expression returns, closures + `move`, `impl Fn` higher-order functions, no default parameters |
| 04 | `d04_control_flow.rs` | `control-flow` | `if`/`loop` are expressions, `match` exhaustive matching, guards, ranges, `if let` |
| 05 | `d05_structs_traits.rs` | `structs` | `struct` + `impl`, `#[derive]`, `trait` + default methods, composition over inheritance |
| 06 | `d06_generics.rs` | `generics` | generic functions/structs, trait bounds, `where`, monomorphization |
| 07 | `d07_errors.rs` | `errors` | `Result<T,E>`, the `?` operator, custom error enums, `Option` instead of null |
| 08 | `d08_concurrency.rs` | `concurrency` | `thread::spawn`, `mpsc` channel, `Arc<Mutex<T>>`, fearless concurrency |
| 09 | `d09_advanced_types.rs` | `advanced-types` | enums carrying data (ADTs), `Box<dyn Trait>`, newtype, type aliases |
| 10 | `d10_macros.rs` | `macros` | `macro_rules!` declarative macros, recursive macros, `#[derive]` derive macros |
| 11 | `d11_ownership.rs` | `ownership` | **ownership, move, borrowing `&`/`&mut`, Copy vs Clone** (Rust's core) |
| 12 | `d12_stdlib.rs` | `stdlib` | `String`/`&str`, string methods, `parse`/`format!`, `HashMap` entry |
| 13 | `d13_iterators.rs` | `iterators` | the `Iterator` trait, lazy adapters, custom iterators, infinite sequences + `take` |
| 14 | `d14_modules.rs` | `modules` | `mod`, private by default + `pub`, paths `::`, `use`, crate |
| 15 | `d15_sorting_equality.rs` | `sorting` | `sort_by_key`/`sort_by`, `Ordering::then`, `derive` equality/hashing, custom `Ord` |
| 16 | `src/mathx.rs` | — | the built-in test framework `#[cfg(test)]` + `#[test]`, table-driven (run with `cargo test`) |

## Type-system highlights (Rust's trade-offs)

- **Ownership + borrowing**: memory safety is guaranteed by the type system **at compile time**, with no GC and no dangling pointers/double frees/data races (see `11`). This is the fundamental thing that sets Rust apart from the other three languages.
- **No null**: use `Option<T>` to express "may be absent" and `Result<T,E>` to express "may fail", and the compiler forces you to handle it (see `07`).
- **Enums are algebraic data types**: variants can carry data, and paired with `match` exhaustive matching they are a powerful modeling tool (see `09`).
- **Traits, not inheritance**: capabilities are described by traits, reuse comes from composition + traits, and there is no class inheritance (see `05`). This corresponds to Go's interfaces, TS's interface, and Python's Protocol.
- **Zero-cost abstractions**: generic monomorphization and iterator adapters compile down to be as fast as hand-written loops (see `06`/`13`).

## Toolchain

| Purpose | Tool |
| --- | --- |
| Toolchain management | `rustup` (or `brew install rust`) |
| Build / run / dependencies | `cargo` (`Cargo.toml` declares dependencies, `crates.io` is the ecosystem registry) |
| Testing | built-in `cargo test` (`#[test]` / `#[cfg(test)]`, no third party needed) |
| Formatting | `cargo fmt` (the single official style) |
| Static analysis | `cargo clippy` (the official lint, recommended to enable) |
