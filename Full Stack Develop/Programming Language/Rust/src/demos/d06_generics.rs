use crate::log::{note, show, title};
use std::fmt::Debug;

/// 泛型 —— 参数化类型，配 trait 约束，编译期单态化（零成本抽象）。
/// 要点：
///   1. <T> 是类型参数；trait 约束 <T: Trait> 决定 T 能用哪些操作。
///   2. 泛型可用于函数、结构体、方法、枚举。
///   3. where 子句让复杂约束更清晰。
///   4. 单态化：编译器为每个具体类型生成专用代码，没有运行时开销。

// 约束 T: PartialOrd + Copy —— 才能比较大小、按值拷贝
fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut max = items[0];
    for &x in &items[1..] {
        if x > max {
            max = x;
        }
    }
    max
}

fn first<T: Clone>(xs: &[T]) -> Option<T> {
    xs.first().cloned()
}

// 泛型结构体
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }
    fn push(&mut self, item: T) {
        self.items.push(item);
    }
    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }
    fn len(&self) -> usize {
        self.items.len()
    }
}

fn describe<T>(x: T) -> String
where
    T: Debug,
{
    format!("{x:?}")
}

pub fn run() {
    title("06 泛型");

    note("泛型函数 + trait 约束：约束决定能做什么");
    show("largest(&[3,9,5])", largest(&[3, 9, 5]));
    show("largest(&[1.5, 2.5])", largest(&[1.5_f64, 2.5]));
    show("largest(&['a','z','m'])", largest(&['a', 'z', 'm']));

    note("泛型 + Option 返回");
    show("first(&[10, 20])", first(&[10, 20]));
    show("first::<i32>(&[])", first::<i32>(&[]));

    note("泛型结构体 Stack<T>：单态化，零成本");
    let mut st: Stack<i32> = Stack::new();
    st.push(1);
    st.push(2);
    show("stack.pop()", st.pop());
    show("stack.len()", st.len());

    note("where 子句：约束多时更清晰");
    show("describe((1, \"a\"))", describe((1, "a")));
}
