//! The Rust version of the minimal printing helper: prints "expression → result" aligned.
//! Corresponds to TypeScript's src/log.ts, Go's internal/logx, and Python's demos/log.py.
//!
//! show uses `{:?}` (Debug) to format any value uniformly: strings get quotes, numbers print raw,
//! and collections print as [..], matching the display style of the other three languages exactly.

use std::fmt::Debug;

const RESET: &str = "\x1b[0m";
const DIM: &str = "\x1b[2m";
const BOLD: &str = "\x1b[1m";
const CYAN: &str = "\x1b[36m";
const GREEN: &str = "\x1b[32m";

/// Print a section heading.
pub fn title(text: &str) {
    let n = text.chars().count();
    let line = "━".repeat(if n >= 40 { 0 } else { 40 - n });
    println!("\n{BOLD}{CYAN}━━ {text} {line}{RESET}");
}

/// Print an explanatory line (a dimmed # comment).
pub fn note(text: &str) {
    println!("  {DIM}# {text}{RESET}");
}

/// Print "expression → result", aligned as expr → value.
pub fn show<T: Debug>(expr: &str, value: T) {
    let n = expr.chars().count();
    let pad = " ".repeat(if n >= 44 { 1 } else { 44 - n });
    println!("  {GREEN}{expr}{pad}{RESET}{DIM}→{RESET} {value:?}");
}
