use crate::log::{note, show, title};

/// 迭代器 —— Rust 的惰性序列抽象，适配器链是日常主力（也是「生成器」的等价物）。
/// 要点：
///   1. Iterator trait 只需实现 next()；map/filter/take 等适配器都是惰性的。
///   2. 惰性：链条上的计算 collect/for 时才发生，可表示无限序列。
///   3. 自定义迭代器 = 给自己的 struct 实现 Iterator。
///   4. 适配器零成本：编译后和手写循环一样快。

// 自定义无限迭代器：斐波那契
struct Fib {
    a: u64,
    b: u64,
}
impl Iterator for Fib {
    type Item = u64;
    fn next(&mut self) -> Option<u64> {
        let cur = self.a;
        self.a = self.b;
        self.b = cur + self.b;
        Some(cur) // 永不返回 None → 无限
    }
}

// 自定义有限迭代器：倒计时
struct Countdown {
    n: u32,
}
impl Iterator for Countdown {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.n == 0 {
            None // 返回 None 即结束
        } else {
            self.n -= 1;
            Some(self.n + 1)
        }
    }
}

pub fn run() {
    title("13 迭代器");

    note("适配器链：惰性，collect 才求值");
    let doubled: Vec<i32> = (1..=5).map(|x| x * 2).collect();
    show("(1..=5).map(*2)", &doubled);

    note("范围 + take：从无限里只取需要的");
    let squares: Vec<i32> = (1..).map(|x| x * x).take(5).collect();
    show("(1..).map(sq).take(5)", &squares);

    note("自定义无限迭代器 Fib + take");
    let fibs: Vec<u64> = Fib { a: 0, b: 1 }.take(10).collect();
    show("Fib.take(10)", &fibs);

    note("自定义有限迭代器：next 返回 None 即结束");
    let cd: Vec<u32> = Countdown { n: 5 }.collect();
    show("Countdown(5)", &cd);

    note("常用适配器：filter / zip / fold / chain");
    let evens: Vec<i32> = (1..=10).filter(|x| x % 2 == 0).collect();
    show("filter evens", &evens);
    let zipped: Vec<(char, i32)> = ['a', 'b', 'c'].into_iter().zip(1..).collect();
    show("zip", &zipped);
    show("fold sum", (1..=5).fold(0, |acc, x| acc + x));
    let chained: Vec<i32> = (0..2).chain(10..12).collect();
    show("chain", &chained);
}
