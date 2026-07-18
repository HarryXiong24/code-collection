use crate::log::{note, show, title};
use std::collections::HashMap;
use std::time::Duration;

/// Common standard-library idioms — String/&str, string methods, parsing/formatting, HashMap entry, iterator aggregation.
/// Key points:
///   1. String is owned and mutable; &str is a borrowed string view, the preferred function parameter.
///   2. String methods all return a new value (the original is an immutable borrow).
///   3. parse/format! do parsing and formatting; format!'s placeholders are powerful.
///   4. HashMap's entry API elegantly handles "insert only if absent / update in place".
///   5. JSON, dates, etc. use ecosystem crates in Rust (serde / chrono); the standard library doesn't include them.
pub fn run() {
    title("12 Common standard-library idioms");

    note("String vs &str: owned vs a borrowed view");
    let mut s = String::from("Hello");
    s.push_str(", Rust");
    show("push_str", &s);
    show("slice &s[0..5]", &s[0..5]);

    note("string methods all return a new value");
    let raw = "  Hello, Rust  ";
    show("trim", raw.trim());
    show("to_uppercase", "rust".to_uppercase());
    show("split", raw.trim().split(", ").collect::<Vec<_>>());
    show("replace", "a-b-c".replace('-', "_"));
    show("contains", "rustlang".contains("lang"));

    note("parsing and formatting");
    show("\"42\".parse::<i32>()", "42".parse::<i32>());
    show("format! zero-pad {:03}", format!("{:03}", 7));
    show("format! decimals {:.2}", format!("{:.2}", 3.14159));
    show("format! percentage", format!("{:.1}%", 81.37));

    note("HashMap entry API: insert only if absent, update in place (word-frequency counting)");
    let mut freq: HashMap<&str, i32> = HashMap::new();
    for w in "the cat the dog the".split(' ') {
        *freq.entry(w).or_insert(0) += 1;
    }
    show("freq the", freq["the"]);
    show("freq cat", freq["cat"]);

    note("iterator aggregation: sum / max / count");
    let nums = [3, 1, 4, 1, 5, 9];
    show("sum", nums.iter().sum::<i32>());
    show("max", nums.iter().max());
    show("count > 3", nums.iter().filter(|&&x| x > 3).count());

    note("Duration: a span of time");
    show("Duration 90 minutes = seconds", Duration::from_secs(90 * 60).as_secs());

    note("JSON / dates use ecosystem crates (serde / chrono); not built into the standard library");
}
