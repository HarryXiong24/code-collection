use crate::log::{note, show, title};
use std::collections::HashMap;

/// Macros / metaprogramming — Rust's metaprogramming is "macros": expanded at compile time, type-safe, not runtime reflection.
/// Key points:
///   1. Declarative macros macro_rules! match by syntactic pattern, generate code, and take variadic arguments.
///   2. Derive macros #[derive(...)] auto-generate trait implementations for a type (most common).
///   3. Macros expand at compile time with zero runtime overhead, and the expansion is still type-checked.
///   4. Compare: TS/Python use decorators, Go uses struct tag + reflection — all aiming to "eliminate boilerplate".

// declarative macro: a custom "literal" syntax to build a HashMap
macro_rules! hashmap {
    ($($key:expr => $val:expr),* $(,)?) => {{
        let mut m = HashMap::new();
        $( m.insert($key, $val); )*
        m
    }};
}

// recursive macro: variadic max
macro_rules! max {
    ($x:expr) => { $x };
    ($x:expr, $($rest:expr),+) => {{
        let r = max!($($rest),+);
        if $x > r { $x } else { r }
    }};
}

// derive macro: auto-implement three traits in one line
#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

pub fn run() {
    title("10 Macros / metaprogramming");

    note("Rust's metaprogramming is macros: expanded at compile time, not runtime reflection");

    note("declarative macro hashmap!: custom literal syntax");
    let m: HashMap<&str, i32> = hashmap! {"a" => 1, "b" => 2};
    show("hashmap! len", m.len());
    show("m[\"a\"]", m["a"]);

    note("recursive macro max!: variadic arguments");
    show("max!(3, 7, 2, 9, 5)", max!(3, 7, 2, 9, 5));

    note("derive macro #[derive]: implement Debug / Clone / PartialEq in one line");
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1.clone();
    show("derived Debug", &p1);
    show("derived PartialEq", p1 == p2);
}
