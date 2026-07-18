use crate::log::{note, show, title};
use std::fmt::Debug;

/// Generics — parameterized types, with trait bounds, monomorphized at compile time (zero-cost abstraction).
/// Key points:
///   1. <T> is a type parameter; the trait bound <T: Trait> decides which operations T can use.
///   2. Generics work for functions, structs, methods, and enums.
///   3. A where clause makes complex bounds clearer.
///   4. Monomorphization: the compiler generates specialized code for each concrete type, with no runtime overhead.

// bound T: PartialOrd + Copy — needed to compare magnitude and copy by value
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

// generic struct
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
    title("06 Generics");

    note("generic function + trait bound: the bound decides what you can do");
    show("largest(&[3,9,5])", largest(&[3, 9, 5]));
    show("largest(&[1.5, 2.5])", largest(&[1.5_f64, 2.5]));
    show("largest(&['a','z','m'])", largest(&['a', 'z', 'm']));

    note("generic + Option return");
    show("first(&[10, 20])", first(&[10, 20]));
    show("first::<i32>(&[])", first::<i32>(&[]));

    note("generic struct Stack<T>: monomorphized, zero cost");
    let mut st: Stack<i32> = Stack::new();
    st.push(1);
    st.push(2);
    show("stack.pop()", st.pop());
    show("stack.len()", st.len());

    note("where clause: clearer when there are many bounds");
    show("describe((1, \"a\"))", describe((1, "a")));
}
