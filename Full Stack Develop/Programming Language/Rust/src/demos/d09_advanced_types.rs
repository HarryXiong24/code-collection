use crate::log::{note, show, title};

/// 高级类型 —— 带数据的枚举（ADT）、trait 对象、newtype、类型别名。
/// 要点：
///   1. 枚举可给每个变体带不同数据 = 代数数据类型，配 match 极强大。
///   2. Box<dyn Trait> 是 trait 对象：一个集合装不同具体类型，运行时分派。
///   3. newtype（元组结构体包一层）给类型加语义，防止参数传错。
///   4. type 别名给复杂类型起短名。

#[derive(Debug)]
enum Json {
    Null,
    Bool(bool),
    Number(f64),
    Text(String),
    Array(Vec<Json>), // 递归：Vec 提供堆间接
}

fn describe(j: &Json) -> String {
    match j {
        Json::Null => "null".to_string(),
        Json::Bool(b) => format!("bool({b})"),
        Json::Number(n) => format!("number({n})"),
        Json::Text(s) => format!("text({s})"),
        Json::Array(a) => format!("array(len={})", a.len()),
    }
}

// trait 对象：运行时多态
trait Animal {
    fn sound(&self) -> String;
}
struct Cat;
struct Dog;
impl Animal for Cat {
    fn sound(&self) -> String {
        "meow".into()
    }
}
impl Animal for Dog {
    fn sound(&self) -> String {
        "woof".into()
    }
}

// newtype：包住 f64，让「摄氏度」成为独立类型
struct Celsius(f64);
impl Celsius {
    fn to_fahrenheit(&self) -> f64 {
        self.0 * 9.0 / 5.0 + 32.0
    }
}

type Pair = (i32, i32); // 类型别名

pub fn run() {
    title("09 高级类型");

    note("带数据的枚举（ADT）：每个变体携带不同数据");
    let v = Json::Array(vec![Json::Number(1.0), Json::Bool(true), Json::Null]);
    show("describe(array)", describe(&v));
    show("describe(text)", describe(&Json::Text("hi".into())));

    note("trait 对象 Box<dyn Trait>：一个 Vec 装不同类型，运行时分派");
    let animals: Vec<Box<dyn Animal>> = vec![Box::new(Cat), Box::new(Dog)];
    let sounds: Vec<String> = animals.iter().map(|a| a.sound()).collect();
    show("dyn Animal sounds", &sounds);

    note("newtype：Celsius 包住 f64，避免和别的数值混用");
    show("37°C → °F", Celsius(37.0).to_fahrenheit());

    note("类型别名：给复杂类型起短名");
    let p: Pair = (10, 20);
    show("Pair", p);
}
