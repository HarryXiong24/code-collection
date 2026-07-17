//! Rust 语言用法演示入口。
//!
//!     cargo run                  跑全部 15 个 demo
//!     cargo run -- generics async   只跑指定的几个
//!     cargo test                 跑单元测试（见 src/mathx.rs）

mod demos;
mod log;
mod mathx;

use demos::*;

fn main() {
    // demo 名 → run 函数，顺序与 TypeScript / Go / Python 项目一一对应。
    let registry: Vec<(&str, fn())> = vec![
        ("types", d01_types::run),
        ("collections", d02_collections::run),
        ("functions", d03_functions::run),
        ("control-flow", d04_control_flow::run),
        ("structs", d05_structs_traits::run),
        ("generics", d06_generics::run),
        ("errors", d07_errors::run),
        ("concurrency", d08_concurrency::run),
        ("advanced-types", d09_advanced_types::run),
        ("macros", d10_macros::run),
        ("ownership", d11_ownership::run),
        ("stdlib", d12_stdlib::run),
        ("iterators", d13_iterators::run),
        ("modules", d14_modules::run),
        ("sorting", d15_sorting_equality::run),
    ];

    let args: Vec<String> = std::env::args()
        .skip(1)
        .filter(|a| !a.starts_with('-'))
        .collect();

    log::title("Rust 语言用法演示");
    for (name, f) in &registry {
        if args.is_empty() || args.iter().any(|a| a == name) {
            f();
        }
    }
    println!();
}
