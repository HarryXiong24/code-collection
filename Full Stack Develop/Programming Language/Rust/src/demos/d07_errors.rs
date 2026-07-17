use crate::log::{note, show, title};

/// 错误处理 —— Result<T, E> + Option<T> + ? 运算符，没有异常。
/// 要点：
///   1. 可恢复错误用 Result<T, E>：类型强制调用方处理，编译器不让你忽略。
///   2. ? 运算符：出错就提前 return Err，把链式调用写得很顺。
///   3. Option<T> 代替 null：要么 Some(值) 要么 None。
///   4. 组合子 map / unwrap_or / ok_or 让你不必每次手写 match。
///   5. panic! 只留给真正不可恢复的 bug。

#[derive(Debug)]
#[allow(dead_code)] // 变体数据仅通过 derive(Debug) 展示
enum ParseAgeError {
    NotNumber(String),
    Negative(i32),
}

fn parse_age(input: &str) -> Result<i32, ParseAgeError> {
    // parse 返回 Result；map_err 把底层错误转成我们的错误类型；? 传播
    let n: i32 = input
        .parse()
        .map_err(|_| ParseAgeError::NotNumber(input.to_string()))?;
    if n < 0 {
        return Err(ParseAgeError::Negative(n));
    }
    Ok(n)
}

fn double_age(input: &str) -> Result<i32, ParseAgeError> {
    let n = parse_age(input)?; // 出错自动 return Err
    Ok(n * 2)
}

pub fn run() {
    title("07 错误处理");

    note("Result<T, E>：用类型强制处理错误，没有异常");
    show("parse_age(\"30\")", parse_age("30"));
    show("parse_age(\"abc\")", parse_age("abc"));
    show("parse_age(\"-5\")", parse_age("-5"));

    note("? 运算符：自动传播 Err");
    show("double_age(\"21\")", double_age("21"));
    show("double_age(\"x\")", double_age("x"));

    note("match 处理 Result 两分支");
    let msg = match parse_age("abc") {
        Ok(n) => format!("ok: {n}"),
        Err(e) => format!("err: {e:?}"),
    };
    show("match result", msg);

    note("Option 代替 null：get 越界返回 None，不会崩");
    let names = ["Alice", "Bob"];
    show("names.get(1)", names.get(1));
    show("names.get(9)", names.get(9));
    show("get(9).unwrap_or(&\"?\")", *names.get(9).unwrap_or(&"?"));

    note("组合子链：map / unwrap_or，不用手写 match");
    let parsed = "42".parse::<i32>().map(|n| n * 2).unwrap_or(-1);
    show("\"42\".parse.map(*2).unwrap_or(-1)", parsed);
}
