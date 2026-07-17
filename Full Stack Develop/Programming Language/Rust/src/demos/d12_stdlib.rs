use crate::log::{note, show, title};
use std::collections::HashMap;
use std::time::Duration;

/// 标准库常用惯例 —— String/&str、字符串方法、解析格式化、HashMap entry、迭代聚合。
/// 要点：
///   1. String 拥有且可变；&str 是借用的字符串视图，函数参数首选 &str。
///   2. 字符串方法都返回新值（原串是不可变借用）。
///   3. parse/format! 做解析与格式化；format! 的占位符很强大。
///   4. HashMap 的 entry API 优雅处理「不存在才插入 / 就地更新」。
///   5. JSON、日期等在 Rust 走生态 crate（serde / chrono），标准库不含。
pub fn run() {
    title("12 标准库常用惯例");

    note("String vs &str：拥有 vs 借用的视图");
    let mut s = String::from("Hello");
    s.push_str(", Rust");
    show("push_str", &s);
    show("切片 &s[0..5]", &s[0..5]);

    note("字符串方法都返回新值");
    let raw = "  Hello, Rust  ";
    show("trim", raw.trim());
    show("to_uppercase", "rust".to_uppercase());
    show("split", raw.trim().split(", ").collect::<Vec<_>>());
    show("replace", "a-b-c".replace('-', "_"));
    show("contains", "rustlang".contains("lang"));

    note("解析与格式化");
    show("\"42\".parse::<i32>()", "42".parse::<i32>());
    show("format! 补零 {:03}", format!("{:03}", 7));
    show("format! 小数 {:.2}", format!("{:.2}", 3.14159));
    show("format! 百分比", format!("{:.1}%", 81.37));

    note("HashMap entry API：不存在才插入、就地更新（词频统计）");
    let mut freq: HashMap<&str, i32> = HashMap::new();
    for w in "the cat the dog the".split(' ') {
        *freq.entry(w).or_insert(0) += 1;
    }
    show("词频 the", freq["the"]);
    show("词频 cat", freq["cat"]);

    note("迭代器聚合：sum / max / count");
    let nums = [3, 1, 4, 1, 5, 9];
    show("sum", nums.iter().sum::<i32>());
    show("max", nums.iter().max());
    show("count > 3", nums.iter().filter(|&&x| x > 3).count());

    note("Duration：时间跨度");
    show("Duration 90 分钟 = 秒", Duration::from_secs(90 * 60).as_secs());

    note("JSON / 日期走生态 crate（serde / chrono），标准库不内置");
}
