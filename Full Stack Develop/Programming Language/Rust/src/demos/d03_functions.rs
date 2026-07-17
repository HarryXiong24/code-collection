use crate::log::{note, show, title};

/// 函数 —— 表达式返回、闭包、高阶函数、泛型。
/// 要点：
///   1. 函数体最后一个「表达式」（无分号）就是返回值。
///   2. Rust 没有默认参数/重载，用 Option 或 builder 表达可选。
///   3. 闭包 |x| ...，move 把环境变量的所有权搬进闭包。
///   4. 用 impl Fn / 泛型接收函数，实现高阶函数。
///   5. 多返回值用元组。

fn add(a: i32, b: i32) -> i32 {
    a + b // 表达式返回：没有分号、没有 return
}

fn divmod(a: i32, b: i32) -> (i32, i32) {
    (a / b, a % b)
}

fn sum(nums: &[i32]) -> i32 {
    nums.iter().sum()
}

// 返回闭包：impl Fn，move 捕获 factor
fn multiplier(factor: i32) -> impl Fn(i32) -> i32 {
    move |n| n * factor
}

// 高阶函数：把行为当参数传进来
fn apply<T, R>(value: T, f: impl Fn(T) -> R) -> R {
    f(value)
}

pub fn run() {
    title("03 函数");

    show("add(2, 3)", add(2, 3));

    note("多返回值用元组");
    show("divmod(17, 5)", divmod(17, 5));

    note("切片参数 &[i32]：零拷贝，兼容数组与 Vec");
    show("sum(&[1,2,3,4])", sum(&[1, 2, 3, 4]));

    note("闭包 + move 捕获");
    let triple = multiplier(3);
    show("triple(10)", triple(10));

    note("高阶函数：闭包作参数");
    show("apply(9, |n| n*n)", apply(9, |n: i32| n * n));

    note("没有默认参数：用 Option 表达可选");
    let greet = |name: &str, greeting: Option<&str>| format!("{}, {}", greeting.unwrap_or("Hi"), name);
    show("greet(None)", greet("Harry", None));
    show("greet(Some(\"Hello\"))", greet("Harry", Some("Hello")));
}
