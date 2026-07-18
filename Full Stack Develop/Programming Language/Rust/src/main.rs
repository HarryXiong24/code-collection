//! Entry point for the Rust language usage demos.
//!
//!     cargo run                     run all 15 demos
//!     cargo run -- generics async   run only the specified ones
//!     cargo test                    run the unit tests (see src/mathx.rs)

mod demos;
mod log;
mod mathx;

use demos::*;

fn main() {
    // demo name → run function; the order corresponds one-to-one to the TypeScript / Go / Python projects.
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

    log::title("Rust language usage demos");
    for (name, f) in &registry {
        if args.is_empty() || args.iter().any(|a| a == name) {
            f();
        }
    }
    println!();
}
