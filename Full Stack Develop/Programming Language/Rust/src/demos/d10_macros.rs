use crate::log::{note, show, title};
use std::collections::HashMap;

/// 宏 / 元编程 —— Rust 的元编程是「宏」：编译期展开、类型安全，不是运行时反射。
/// 要点：
///   1. 声明宏 macro_rules! 按语法模式匹配、生成代码，可变参数。
///   2. 派生宏 #[derive(...)] 自动为类型生成 trait 实现（最常用）。
///   3. 宏在编译期展开，零运行时开销，且展开结果仍受类型检查。
///   4. 对照：TS/Python 用装饰器、Go 用 struct tag + 反射 —— 目标都是「消除样板」。

// 声明宏：自定义「字面量」语法，构造 HashMap
macro_rules! hashmap {
    ($($key:expr => $val:expr),* $(,)?) => {{
        let mut m = HashMap::new();
        $( m.insert($key, $val); )*
        m
    }};
}

// 递归宏：可变参数求最大值
macro_rules! max {
    ($x:expr) => { $x };
    ($x:expr, $($rest:expr),+) => {{
        let r = max!($($rest),+);
        if $x > r { $x } else { r }
    }};
}

// 派生宏：一行自动实现三个 trait
#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

pub fn run() {
    title("10 宏 / 元编程");

    note("Rust 的元编程是宏：编译期展开，不是运行时反射");

    note("声明宏 hashmap!：自定义字面量语法");
    let m: HashMap<&str, i32> = hashmap! {"a" => 1, "b" => 2};
    show("hashmap! len", m.len());
    show("m[\"a\"]", m["a"]);

    note("递归宏 max!：可变参数");
    show("max!(3, 7, 2, 9, 5)", max!(3, 7, 2, 9, 5));

    note("派生宏 #[derive]：一行实现 Debug / Clone / PartialEq");
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1.clone();
    show("derived Debug", &p1);
    show("derived PartialEq", p1 == p2);
}
