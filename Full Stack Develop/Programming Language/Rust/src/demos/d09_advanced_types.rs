use crate::log::{note, show, title};

/// Advanced types — enums carrying data (ADTs), trait objects, newtype, type aliases.
/// Key points:
///   1. An enum can give each variant different data = algebraic data type, extremely powerful with match.
///   2. Box<dyn Trait> is a trait object: one collection holds different concrete types, dispatched at runtime.
///   3. A newtype (wrapping in a tuple struct) adds semantics to a type, preventing wrong arguments.
///   4. type aliases give a complex type a short name.

#[derive(Debug)]
enum Json {
    Null,
    Bool(bool),
    Number(f64),
    Text(String),
    Array(Vec<Json>), // recursive: Vec provides heap indirection
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

// trait object: runtime polymorphism
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

// newtype: wraps an f64 so "Celsius" becomes a distinct type
struct Celsius(f64);
impl Celsius {
    fn to_fahrenheit(&self) -> f64 {
        self.0 * 9.0 / 5.0 + 32.0
    }
}

type Pair = (i32, i32); // type alias

pub fn run() {
    title("09 Advanced types");

    note("enums carrying data (ADTs): each variant carries different data");
    let v = Json::Array(vec![Json::Number(1.0), Json::Bool(true), Json::Null]);
    show("describe(array)", describe(&v));
    show("describe(text)", describe(&Json::Text("hi".into())));

    note("trait object Box<dyn Trait>: one Vec holds different types, dispatched at runtime");
    let animals: Vec<Box<dyn Animal>> = vec![Box::new(Cat), Box::new(Dog)];
    let sounds: Vec<String> = animals.iter().map(|a| a.sound()).collect();
    show("dyn Animal sounds", &sounds);

    note("newtype: Celsius wraps an f64, avoiding mixups with other numbers");
    show("37°C → °F", Celsius(37.0).to_fahrenheit());

    note("type alias: a short name for a complex type");
    let p: Pair = (10, 20);
    show("Pair", p);
}
