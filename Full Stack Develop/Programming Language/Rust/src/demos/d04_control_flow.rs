use crate::log::{note, show, title};

/// Control flow — if is an expression, match pattern matching, loop/while/for.
/// Key points:
///   1. if / loop are both "expressions", so you can assign their result directly to a variable.
///   2. match is exhaustive pattern matching, the core of how Rust handles branching.
///   3. match supports guards `if`, ranges `1..=9`, and bindings.
///   4. if let is shorthand for "only care about one branch".
///   5. for iterates an iterator; loop can return a value with break.

enum Shape {
    Circle { r: f64 },
    Square { side: f64 },
    Rect { w: f64, h: f64 },
}

fn area(s: &Shape) -> f64 {
    // match must cover all variants; miss one and it won't compile
    match s {
        Shape::Circle { r } => std::f64::consts::PI * r * r,
        Shape::Square { side } => side * side,
        Shape::Rect { w, h } => w * h,
    }
}

pub fn run() {
    title("04 Control flow");

    note("if is an expression, assigned directly");
    let score = 82;
    let grade = if score >= 90 {
        "A"
    } else if score >= 80 {
        "B"
    } else {
        "C"
    };
    show("grade", grade);

    note("for + enumerate: iterate while getting the index");
    for (i, fruit) in ["apple", "banana", "cherry"].iter().enumerate() {
        show(&format!("fruits[{i}]"), *fruit);
    }

    note("match: exhaustive matching of an enum");
    show("area(circle r=2)", format!("{:.2}", area(&Shape::Circle { r: 2.0 })));
    show("area(square side=5)", area(&Shape::Square { side: 5.0 }));
    show("area(rect 3x4)", area(&Shape::Rect { w: 3.0, h: 4.0 }));

    note("match guard + range pattern");
    let describe = |n: i32| match n {
        0 => "zero",
        x if x < 0 => "negative",
        1..=9 => "small",
        _ => "large",
    };
    show("describe(-5)", describe(-5));
    show("describe(7)", describe(7));
    show("describe(100)", describe(100));

    note("if let: shorthand for handling only one branch");
    let maybe: Option<i32> = Some(42);
    if let Some(v) = maybe {
        show("if let Some(v)", v);
    }

    note("while collects; loop returns a value with break");
    let mut n = 3;
    let mut acc = vec![];
    while n > 0 {
        acc.push(n);
        n -= 1;
    }
    show("while collected", &acc);

    let mut i = 0;
    let doubled = loop {
        i += 1;
        if i == 5 {
            break i * 2; // loop returns as an expression
        }
    };
    show("loop break value", doubled);
}
