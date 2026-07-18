use crate::log::{note, show, title};

/// Structs / methods / traits — Rust uses struct to hold data, impl to add methods, trait to abstract.
/// Key points:
///   1. #[derive(...)] auto-implements common traits like Debug/Clone/PartialEq in one line.
///   2. In an impl block, &self is read-only, &mut self can mutate; returning &mut Self supports chaining.
///   3. trait = interface, can carry "default methods"; a type can implement multiple traits.
///   4. Rust has no inheritance; use "composition + traits" instead.
///   5. Generic bounds impl Trait / <T: Trait> let a function accept any implementer.

#[derive(Debug, Clone)]
#[allow(dead_code)] // fields are shown only via derive(Debug); dead-code analysis ignores this use
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
        self // return &mut Self to chain calls
    }
    fn summary(&self) -> String {
        format!("{}: ¥{}", self.owner, self.balance)
    }
}

// trait = interface, can provide default methods
trait Greet {
    fn greet(&self) -> String;
    fn shout(&self) -> String {
        format!("{}!!!", self.greet()) // default implementation, can be overridden
    }
}

impl Greet for Account {
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.owner)
    }
}

// generic bound: any type implementing Greet can be passed in
fn announce(g: &impl Greet) -> String {
    g.greet()
}

pub fn run() {
    title("05 Structs / methods / traits");

    note("#[derive] auto-implements common traits");
    let u = User { id: 1, name: "Harry".to_string() };
    show("User (derived Debug)", &u);
    show("clone()", u.clone());

    note("impl methods: only &mut self can mutate; method chaining");
    let mut acc = Account::new("Harry", 100);
    acc.deposit(50).deposit(20);
    show("acc.summary()", acc.summary());

    note("trait default method: shout reuses greet");
    show("acc.greet()", acc.greet());
    show("acc.shout()", acc.shout());

    note("generic bound: announce accepts any type implementing Greet");
    show("announce(&acc)", announce(&acc));
}
