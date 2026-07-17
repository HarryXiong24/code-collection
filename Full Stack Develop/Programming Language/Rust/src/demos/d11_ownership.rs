use crate::log::{note, show, title};

/// 所有权与借用 —— Rust 最核心、也最独特的机制，内存安全无需 GC。
/// 要点：
///   1. 每个值有唯一「所有者」，所有者离开作用域，值被自动释放（RAII）。
///   2. 非 Copy 类型（如 String）赋值/传参是 move，原变量随即失效。
///   3. Copy 类型（整数等）赋值是按位拷贝，原变量仍可用。
///   4. 借用 &T 只读、&mut T 可写；规则：多个只读 或 唯一一个可写，二选一。
///   5. 这套规则在编译期消灭了「悬垂指针 / 双重释放 / 数据竞争」。

fn takes_ownership(s: String) -> usize {
    s.len() // s 的所有权被移交进来，函数结束时释放
}

fn borrows(s: &String) -> usize {
    s.len() // 只借用，不夺走所有权
}

fn appends(s: &mut String) {
    s.push_str("!"); // 可变借用，能改
}

pub fn run() {
    title("11 所有权与借用（Rust 核心）");

    note("move 语义：String 赋值转移所有权，要同时用得显式 clone");
    let s1 = String::from("hello");
    let s2 = s1.clone();
    show("s1（clone 后仍可用）", &s1);
    show("s2", &s2);

    note("Copy 类型：整数赋值是拷贝，原变量仍可用");
    let a = 10;
    let b = a;
    show("a / b", (a, b));

    note("所有权移进函数：这里用返回值拿回信息");
    let owned = String::from("moved");
    let len = takes_ownership(owned); // owned 之后不可再用
    show("takes_ownership len", len);

    note("借用 &T：借完还给你，原值继续可用");
    let s = String::from("borrow me");
    let len = borrows(&s);
    show("borrows len（s 仍可用）", (len, &s));

    note("可变借用 &mut T：能改，但同一时刻只能有一个");
    let mut msg = String::from("hi");
    appends(&mut msg);
    show("after &mut append", &msg);

    note("借用规则：任意多个只读借用 或 唯一一个可变借用");
    let v = vec![1, 2, 3];
    let r1 = &v;
    let r2 = &v; // 多个只读借用 OK
    show("多个只读借用", (r1, r2));

    note("作用域结束自动释放（RAII）：无 GC，也无需手动 free");
}
