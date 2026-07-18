use crate::log::{note, show, title};

/// Ownership & borrowing — Rust's most central and most distinctive mechanism, memory safety without a GC.
/// Key points:
///   1. Every value has a unique "owner"; when the owner leaves scope, the value is freed automatically (RAII).
///   2. For non-Copy types (like String), assignment/argument passing is a move, and the original variable becomes invalid.
///   3. For Copy types (integers, etc.), assignment is a bitwise copy, and the original variable is still usable.
///   4. Borrow &T is read-only, &mut T is writable; the rule: many read-only OR exactly one writable, pick one.
///   5. These rules eliminate "dangling pointers / double frees / data races" at compile time.

fn takes_ownership(s: String) -> usize {
    s.len() // ownership of s is moved in; freed when the function ends
}

fn borrows(s: &String) -> usize {
    s.len() // only borrows, doesn't take ownership
}

fn appends(s: &mut String) {
    s.push_str("!"); // mutable borrow, can modify
}

pub fn run() {
    title("11 Ownership & borrowing (Rust's core)");

    note("move semantics: assigning a String transfers ownership; to use both, clone explicitly");
    let s1 = String::from("hello");
    let s2 = s1.clone();
    show("s1 (still usable after clone)", &s1);
    show("s2", &s2);

    note("Copy type: assigning an integer is a copy, the original is still usable");
    let a = 10;
    let b = a;
    show("a / b", (a, b));

    note("move ownership into a function: here we recover info via the return value");
    let owned = String::from("moved");
    let len = takes_ownership(owned); // owned can no longer be used afterward
    show("takes_ownership len", len);

    note("borrow &T: it's given back after borrowing, the original stays usable");
    let s = String::from("borrow me");
    let len = borrows(&s);
    show("borrows len (s still usable)", (len, &s));

    note("mutable borrow &mut T: can modify, but only one at a time");
    let mut msg = String::from("hi");
    appends(&mut msg);
    show("after &mut append", &msg);

    note("borrow rules: any number of read-only borrows OR a single mutable borrow");
    let v = vec![1, 2, 3];
    let r1 = &v;
    let r2 = &v; // multiple read-only borrows are OK
    show("multiple read-only borrows", (r1, r2));

    note("freed automatically at end of scope (RAII): no GC, no manual free needed");
}
