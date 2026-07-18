//! 16 Testing — Rust's built-in test framework, `#[cfg(test)]` + `cargo test`, zero third-party dependencies.
//!
//! Run:
//!     cargo test                  run all tests
//!     cargo test -- --nocapture   also print println! output
//!
//! Key points:
//!   1. Test functions are marked `#[test]` and assert with assert_eq! / assert!.
//!   2. The test module is marked `#[cfg(test)]`, compiled only during `cargo test`.
//!   3. Table-driven: list "input → expected" in an array and assert in a loop.
//!   4. `#[should_panic]` asserts that a piece of code panics.

#![allow(dead_code)] // these functions are used only by tests; not dead code in non-test builds

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
        // table-driven: one table covers multiple inputs
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
