use crate::log::{note, show, title};

/// 类型与变量 —— Rust 静态强类型，编译期推断，运行时零开销。
/// 要点：
///   1. let 声明默认「不可变」，要改得写 let mut。
///   2. 类型能推断就不用标注；标量类型 i32/i64/f64/bool/char 界限清晰。
///   3. 整数溢出：debug 下 panic，用 checked_/wrapping_ 显式处理。
///   4. 没有隐式数值转换，一律用 as 显式转。
///   5. shadowing：用 let 同名重新绑定，甚至能换类型。
pub fn run() {
    title("01 类型与变量");

    note("let 默认不可变；mut 才能改");
    let name = "Harry"; // &str，推断
    let age: i32 = 30; // 显式标注
    let price = 9.99_f64;
    let is_vip = true;
    show("name / age / price / is_vip", format!("{name} / {age} / {price} / {is_vip}"));

    note("可变要显式 mut");
    let mut counter = 0;
    counter += 1;
    show("counter after += 1", counter);

    note("shadowing：同名 let 重新绑定，可换类型");
    let spaces = "   ";
    let spaces = spaces.len(); // 现在是 usize
    show("shadowed spaces → len", spaces);

    note("整数溢出显式处理：checked 返回 Option，wrapping 回绕");
    let max = i32::MAX;
    show("i32::MAX", max);
    show("max.checked_add(1)", max.checked_add(1)); // None
    show("max.wrapping_add(1)", max.wrapping_add(1)); // 回绕到 i32::MIN

    note("没有隐式转换，用 as 显式转");
    let i = 7_i32;
    let f = 2.0_f64;
    show("i as f64 / f", i as f64 / f);

    note("char 是 4 字节 Unicode 标量，不是字节");
    let c = '语';
    show("'语' as u32", c as u32);
    show("\"Go语言\".chars().count()", "Go语言".chars().count());
    show("\"Go语言\".len()（字节数）", "Go语言".len());

    note("const 是编译期常量，必须标注类型");
    const PI: f64 = 3.14159;
    show("PI", PI);

    note("元组：定长、可含不同类型，用 .0 .1 取值");
    let pair: (i32, &str) = (1, "one");
    show("pair", pair);
    show("pair.1", pair.1);
}
