use crate::log::{note, show, title};

/// Types & variables — Rust is statically and strongly typed, inferred at compile time, zero runtime overhead.
/// Key points:
///   1. let declarations are "immutable" by default; to mutate you write let mut.
///   2. Skip the annotation when the type can be inferred; scalar types i32/i64/f64/bool/char have clear boundaries.
///   3. Integer overflow: panics in debug, handle explicitly with checked_/wrapping_.
///   4. No implicit numeric conversion; always convert explicitly with as.
///   5. Shadowing: rebind the same name with let, and you can even change its type.
pub fn run() {
    title("01 Types & variables");

    note("let is immutable by default; only mut can change");
    let name = "Harry"; // &str, inferred
    let age: i32 = 30; // explicit annotation
    let price = 9.99_f64;
    let is_vip = true;
    show("name / age / price / is_vip", format!("{name} / {age} / {price} / {is_vip}"));

    note("mutability must be explicit with mut");
    let mut counter = 0;
    counter += 1;
    show("counter after += 1", counter);

    note("shadowing: rebind the same name with let, can change type");
    let spaces = "   ";
    let spaces = spaces.len(); // now a usize
    show("shadowed spaces → len", spaces);

    note("handle integer overflow explicitly: checked returns Option, wrapping wraps around");
    let max = i32::MAX;
    show("i32::MAX", max);
    show("max.checked_add(1)", max.checked_add(1)); // None
    show("max.wrapping_add(1)", max.wrapping_add(1)); // wraps around to i32::MIN

    note("no implicit conversion; convert explicitly with as");
    let i = 7_i32;
    let f = 2.0_f64;
    show("i as f64 / f", i as f64 / f);

    note("char is a 4-byte Unicode scalar, not a byte");
    let c = '语';
    show("'语' as u32", c as u32);
    show("\"Go语言\".chars().count()", "Go语言".chars().count());
    show("\"Go语言\".len() (byte count)", "Go语言".len());

    note("const is a compile-time constant and must be annotated");
    const PI: f64 = 3.14159;
    show("PI", PI);

    note("tuple: fixed length, can hold different types, access with .0 .1");
    let pair: (i32, &str) = (1, "one");
    show("pair", pair);
    show("pair.1", pair.1);
}
