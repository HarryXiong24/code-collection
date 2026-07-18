use crate::log::{note, show, title};

/// Modules & visibility — mod organizes code, private by default, pub to export; Cargo manages the package (crate).
/// Key points:
///   1. mod defines a module, either inline or split into files; modules can nest.
///   2. Everything is "private" by default; add pub to make it externally visible — the opposite of the other three languages' public-by-default.
///   3. Access via the path a::b::c; use brings a name in to avoid writing the full path each time.
///   4. A crate is a compilation unit (a library or binary), defined by Cargo.toml.

// inline module: private by default, pub to export
mod shapes {
    pub const PI: f64 = 3.14159;

    pub fn circle_area(r: f64) -> f64 {
        PI * square(r) // the private function is usable within the same module
    }

    // no pub → invisible outside the module
    fn square(x: f64) -> f64 {
        x * x
    }

    // nested module
    pub mod inner {
        pub fn hello() -> &'static str {
            "from inner"
        }
    }
}

pub fn run() {
    title("14 Modules & visibility");

    note("mod defines a module; private by default, pub to export");
    show("shapes::PI", shapes::PI);
    show("shapes::circle_area(2.0)", shapes::circle_area(2.0));

    note("the private item shapes::square is inaccessible outside the module — blocked at compile time");

    note("access a nested module via the :: path");
    show("shapes::inner::hello()", shapes::inner::hello());

    note("use brings a name in, then call it directly");
    use shapes::circle_area;
    show("call directly after use", circle_area(1.0));

    note("Cargo: one crate = one compilation unit; each file under src/ is a module");
}
