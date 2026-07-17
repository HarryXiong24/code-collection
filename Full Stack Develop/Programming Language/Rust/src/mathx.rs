//! 16 测试 —— Rust 内置测试框架，`#[cfg(test)]` + `cargo test`，零第三方依赖。
//!
//! 运行：
//!     cargo test              跑全部测试
//!     cargo test -- --nocapture   连带打印 println!
//!
//! 要点：
//!   1. 测试函数标 `#[test]`，用 assert_eq! / assert! 断言。
//!   2. 测试模块用 `#[cfg(test)]` 标注，只在 `cargo test` 时编译。
//!   3. 表驱动：把「输入 → 期望」列成数组，循环断言。
//!   4. `#[should_panic]` 断言某段代码会 panic。

#![allow(dead_code)] // 这些函数只被测试用到，非测试构建下不算死代码

pub fn classify(n: i32) -> &'static str {
    if n < 0 {
        "negative"
    } else if n == 0 {
        "zero"
    } else {
        "positive"
    }
}

pub fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_classify() {
        // 表驱动：一张表覆盖多组输入
        for (input, expected) in [(-5, "negative"), (0, "zero"), (42, "positive")] {
            assert_eq!(classify(input), expected, "classify({input})");
        }
    }

    #[test]
    fn test_divide_ok() {
        assert_eq!(divide(10, 2), Ok(5));
    }

    #[test]
    fn test_divide_by_zero() {
        assert!(divide(1, 0).is_err());
    }

    #[test]
    #[should_panic(expected = "boom")]
    fn test_panics() {
        panic!("boom");
    }
}
