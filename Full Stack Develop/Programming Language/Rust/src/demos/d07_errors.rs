use crate::log::{note, show, title};

/// Error handling — Result<T, E> + Option<T> + the ? operator, no exceptions.
/// Key points:
///   1. Recoverable errors use Result<T, E>: the type forces the caller to handle it, the compiler won't let you ignore it.
///   2. The ? operator: on error it returns Err early, making chained calls read smoothly.
///   3. Option<T> replaces null: either Some(value) or None.
///   4. Combinators map / unwrap_or / ok_or spare you writing match every time.
///   5. panic! is reserved for truly unrecoverable bugs.

#[derive(Debug)]
#[allow(dead_code)] // variant data is shown only via derive(Debug)
enum ParseAgeError {
    NotNumber(String),
    Negative(i32),
}

fn parse_age(input: &str) -> Result<i32, ParseAgeError> {
    // parse returns Result; map_err converts the underlying error into our error type; ? propagates
    let n: i32 = input
        .parse()
        .map_err(|_| ParseAgeError::NotNumber(input.to_string()))?;
    if n < 0 {
        return Err(ParseAgeError::Negative(n));
    }
    Ok(n)
}

fn double_age(input: &str) -> Result<i32, ParseAgeError> {
    let n = parse_age(input)?; // on error, automatically return Err
    Ok(n * 2)
}

pub fn run() {
    title("07 Error handling");

    note("Result<T, E>: the type forces you to handle errors, no exceptions");
    show("parse_age(\"30\")", parse_age("30"));
    show("parse_age(\"abc\")", parse_age("abc"));
    show("parse_age(\"-5\")", parse_age("-5"));

    note("? operator: automatically propagates Err");
    show("double_age(\"21\")", double_age("21"));
    show("double_age(\"x\")", double_age("x"));

    note("match handles both branches of Result");
    let msg = match parse_age("abc") {
        Ok(n) => format!("ok: {n}"),
        Err(e) => format!("err: {e:?}"),
    };
    show("match result", msg);

    note("Option replaces null: get out of bounds returns None, no crash");
    let names = ["Alice", "Bob"];
    show("names.get(1)", names.get(1));
    show("names.get(9)", names.get(9));
    show("get(9).unwrap_or(&\"?\")", *names.get(9).unwrap_or(&"?"));

    note("combinator chain: map / unwrap_or, no manual match");
    let parsed = "42".parse::<i32>().map(|n| n * 2).unwrap_or(-1);
    show("\"42\".parse.map(*2).unwrap_or(-1)", parsed);
}
