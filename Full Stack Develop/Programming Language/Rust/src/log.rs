//! 极简打印工具的 Rust 版：把「表达式 → 结果」对齐打印出来。
//! 对应 TypeScript 的 src/log.ts、Go 的 internal/logx、Python 的 demos/log.py。
//!
//! show 用 `{:?}`（Debug）统一格式化任意值：字符串带引号、数字直出、
//! 集合打印成 [..]，正好和另外三门语言的展示风格一致。

use std::fmt::Debug;

const RESET: &str = "\x1b[0m";
const DIM: &str = "\x1b[2m";
const BOLD: &str = "\x1b[1m";
const CYAN: &str = "\x1b[36m";
const GREEN: &str = "\x1b[32m";

/// 打印一节的标题。
pub fn title(text: &str) {
    let n = text.chars().count();
    let line = "━".repeat(if n >= 40 { 0 } else { 40 - n });
    println!("\n{BOLD}{CYAN}━━ {text} {line}{RESET}");
}

/// 打印一行讲解（灰色 # 注释）。
pub fn note(text: &str) {
    println!("  {DIM}# {text}{RESET}");
}

/// 打印「表达式 → 结果」，对齐成 expr → value。
pub fn show<T: Debug>(expr: &str, value: T) {
    let n = expr.chars().count();
    let pad = " ".repeat(if n >= 44 { 1 } else { 44 - n });
    println!("  {GREEN}{expr}{pad}{RESET}{DIM}→{RESET} {value:?}");
}
