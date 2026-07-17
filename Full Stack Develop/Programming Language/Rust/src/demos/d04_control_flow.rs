use crate::log::{note, show, title};

/// 控制流 —— if 是表达式、match 模式匹配、loop/while/for。
/// 要点：
///   1. if / loop 都是「表达式」，能直接把结果赋给变量。
///   2. match 是穷尽的模式匹配，是 Rust 处理分支的核心。
///   3. match 支持守卫 `if`、范围 `1..=9`、绑定。
///   4. if let 是「只关心一个分支」的简写。
///   5. for 遍历迭代器；loop 可用 break 返回值。

enum Shape {
    Circle { r: f64 },
    Square { side: f64 },
    Rect { w: f64, h: f64 },
}

fn area(s: &Shape) -> f64 {
    // match 必须覆盖所有变体，漏了编译不过
    match s {
        Shape::Circle { r } => std::f64::consts::PI * r * r,
        Shape::Square { side } => side * side,
        Shape::Rect { w, h } => w * h,
    }
}

pub fn run() {
    title("04 控制流");

    note("if 是表达式，直接赋值");
    let score = 82;
    let grade = if score >= 90 {
        "A"
    } else if score >= 80 {
        "B"
    } else {
        "C"
    };
    show("grade", grade);

    note("for + enumerate：遍历同时拿下标");
    for (i, fruit) in ["apple", "banana", "cherry"].iter().enumerate() {
        show(&format!("fruits[{i}]"), *fruit);
    }

    note("match：穷尽匹配枚举");
    show("area(circle r=2)", format!("{:.2}", area(&Shape::Circle { r: 2.0 })));
    show("area(square side=5)", area(&Shape::Square { side: 5.0 }));
    show("area(rect 3x4)", area(&Shape::Rect { w: 3.0, h: 4.0 }));

    note("match 守卫 + 范围模式");
    let describe = |n: i32| match n {
        0 => "zero",
        x if x < 0 => "negative",
        1..=9 => "small",
        _ => "large",
    };
    show("describe(-5)", describe(-5));
    show("describe(7)", describe(7));
    show("describe(100)", describe(100));

    note("if let：只处理一个分支的简写");
    let maybe: Option<i32> = Some(42);
    if let Some(v) = maybe {
        show("if let Some(v)", v);
    }

    note("while 收集；loop 用 break 返回值");
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
            break i * 2; // loop 作为表达式返回
        }
    };
    show("loop break value", doubled);
}
