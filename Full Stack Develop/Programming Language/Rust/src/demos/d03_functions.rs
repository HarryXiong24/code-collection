use crate::log::{note, show, title};

/// Functions — expression returns, closures, higher-order functions, generics.
/// Key points:
///   1. The last "expression" in a function body (no semicolon) is the return value.
///   2. Rust has no default parameters/overloading; use Option or a builder to express optionality.
///   3. Closures |x| ...; move transfers ownership of captured environment variables into the closure.
///   4. Use impl Fn / generics to accept functions, implementing higher-order functions.
///   5. Use a tuple for multiple return values.

fn add(a: i32, b: i32) -> i32 {
    a + b // expression return: no semicolon, no return
}

fn divmod(a: i32, b: i32) -> (i32, i32) {
    (a / b, a % b)
}

fn sum(nums: &[i32]) -> i32 {
    nums.iter().sum()
}

// return a closure: impl Fn, move-capturing factor
fn multiplier(factor: i32) -> impl Fn(i32) -> i32 {
    move |n| n * factor
}

// higher-order function: pass behavior in as a parameter
fn apply<T, R>(value: T, f: impl Fn(T) -> R) -> R {
    f(value)
}

pub fn run() {
    title("03 Functions");

    show("add(2, 3)", add(2, 3));

    note("use a tuple for multiple return values");
    show("divmod(17, 5)", divmod(17, 5));

    note("slice parameter &[i32]: zero-copy, compatible with arrays and Vec");
    show("sum(&[1,2,3,4])", sum(&[1, 2, 3, 4]));

    note("closure + move capture");
    let triple = multiplier(3);
    show("triple(10)", triple(10));

    note("higher-order function: a closure as an argument");
    show("apply(9, |n| n*n)", apply(9, |n: i32| n * n));

    note("no default parameters: use Option to express optionality");
    let greet = |name: &str, greeting: Option<&str>| format!("{}, {}", greeting.unwrap_or("Hi"), name);
    show("greet(None)", greet("Harry", None));
    show("greet(Some(\"Hello\"))", greet("Harry", Some("Hello")));
}
