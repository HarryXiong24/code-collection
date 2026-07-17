use crate::log::{note, show, title};

/// 结构体 / 方法 / trait —— Rust 用 struct 装数据，impl 加方法，trait 做抽象。
/// 要点：
///   1. #[derive(...)] 一行自动实现 Debug/Clone/PartialEq 等常用 trait。
///   2. impl 块里 &self 只读、&mut self 可改；返回 &mut Self 支持链式。
///   3. trait = 接口，可带「默认方法」；一个类型可实现多个 trait。
///   4. Rust 没有继承，用「组合 + trait」代替。
///   5. 泛型约束 impl Trait / <T: Trait> 让函数接受任何实现者。

#[derive(Debug, Clone)]
#[allow(dead_code)] // 字段仅通过 derive(Debug) 展示，dead-code 分析会忽略这种使用
struct User {
    id: u32,
    name: String,
}

struct Account {
    owner: String,
    balance: i64,
}

impl Account {
    fn new(owner: &str, initial: i64) -> Self {
        Account { owner: owner.to_string(), balance: initial }
    }
    fn deposit(&mut self, amount: i64) -> &mut Self {
        self.balance += amount;
        self // 返回 &mut Self 以链式调用
    }
    fn summary(&self) -> String {
        format!("{}: ¥{}", self.owner, self.balance)
    }
}

// trait = 接口，可提供默认方法
trait Greet {
    fn greet(&self) -> String;
    fn shout(&self) -> String {
        format!("{}!!!", self.greet()) // 默认实现，可被覆盖
    }
}

impl Greet for Account {
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.owner)
    }
}

// 泛型约束：任何实现了 Greet 的类型都能传进来
fn announce(g: &impl Greet) -> String {
    g.greet()
}

pub fn run() {
    title("05 结构体 / 方法 / trait");

    note("#[derive] 自动实现常用 trait");
    let u = User { id: 1, name: "Harry".to_string() };
    show("User (derived Debug)", &u);
    show("clone()", u.clone());

    note("impl 方法：&mut self 才能改，链式调用");
    let mut acc = Account::new("Harry", 100);
    acc.deposit(50).deposit(20);
    show("acc.summary()", acc.summary());

    note("trait 默认方法：shout 复用 greet");
    show("acc.greet()", acc.greet());
    show("acc.shout()", acc.shout());

    note("泛型约束：announce 接受任何实现了 Greet 的类型");
    show("announce(&acc)", announce(&acc));
}
