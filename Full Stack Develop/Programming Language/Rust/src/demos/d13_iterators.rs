use crate::log::{note, show, title};

/// Iterators — Rust's lazy sequence abstraction; adapter chains are the daily workhorse (also the equivalent of "generators").
/// Key points:
///   1. The Iterator trait needs only next() implemented; adapters like map/filter/take are all lazy.
///   2. Lazy: the computation in a chain happens at collect/for, so it can represent infinite sequences.
///   3. A custom iterator = implementing Iterator for your own struct.
///   4. Adapters are zero-cost: after compilation they're as fast as a hand-written loop.

// custom infinite iterator: Fibonacci
struct Fib {
    a: u64,
    b: u64,
}
impl Iterator for Fib {
    type Item = u64;
    fn next(&mut self) -> Option<u64> {
        let cur = self.a;
        self.a = self.b;
        self.b = cur + self.b;
        Some(cur) // never returns None → infinite
    }
}

// custom finite iterator: countdown
struct Countdown {
    n: u32,
}
impl Iterator for Countdown {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.n == 0 {
            None // returning None ends it
        } else {
            self.n -= 1;
            Some(self.n + 1)
        }
    }
}

pub fn run() {
    title("13 Iterators");

    note("adapter chain: lazy, evaluated only at collect");
    let doubled: Vec<i32> = (1..=5).map(|x| x * 2).collect();
    show("(1..=5).map(*2)", &doubled);

    note("range + take: take only what you need from something infinite");
    let squares: Vec<i32> = (1..).map(|x| x * x).take(5).collect();
    show("(1..).map(sq).take(5)", &squares);

    note("custom infinite iterator Fib + take");
    let fibs: Vec<u64> = Fib { a: 0, b: 1 }.take(10).collect();
    show("Fib.take(10)", &fibs);

    note("custom finite iterator: next returning None ends it");
    let cd: Vec<u32> = Countdown { n: 5 }.collect();
    show("Countdown(5)", &cd);

    note("common adapters: filter / zip / fold / chain");
    let evens: Vec<i32> = (1..=10).filter(|x| x % 2 == 0).collect();
    show("filter evens", &evens);
    let zipped: Vec<(char, i32)> = ['a', 'b', 'c'].into_iter().zip(1..).collect();
    show("zip", &zipped);
    show("fold sum", (1..=5).fold(0, |acc, x| acc + x));
    let chained: Vec<i32> = (0..2).chain(10..12).collect();
    show("chain", &chained);
}
