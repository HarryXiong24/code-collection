use crate::log::{note, show, title};
use std::cmp::Ordering;
use std::collections::HashSet;

/// Custom sorting & equality — sort_by_key / sort_by, derived equality and hashing, custom Ord.
/// Key points:
///   1. sort_by_key takes a sort key; sort_by uses a comparator returning Ordering.
///   2. Multi-key sorting chains with Ordering::then.
///   3. sort is stable; sort_unstable is faster but doesn't guarantee the order of equal elements.
///   4. #[derive(PartialEq, Eq, Hash)] → value equality, usable as a HashSet/HashMap key.
///   5. Implement Ord yourself to use < > and sort.

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Employee {
    name: String,
    dept: String,
    age: u32,
}

// custom Ord: compare major first, then minor
#[derive(PartialEq, Eq)]
struct Version {
    major: u32,
    minor: u32,
}
impl Ord for Version {
    fn cmp(&self, other: &Self) -> Ordering {
        self.major.cmp(&other.major).then(self.minor.cmp(&other.minor))
    }
}
impl PartialOrd for Version {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}
impl std::fmt::Debug for Version {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}.{}", self.major, self.minor)
    }
}

fn emp(name: &str, dept: &str, age: u32) -> Employee {
    Employee { name: name.into(), dept: dept.into(), age }
}

fn names(es: &[Employee]) -> Vec<&str> {
    es.iter().map(|e| e.name.as_str()).collect()
}

pub fn run() {
    title("15 Custom sorting & equality");

    let people = vec![
        emp("Alice", "eng", 30),
        emp("Bob", "sales", 25),
        emp("Carol", "eng", 25),
        emp("Dave", "sales", 40),
    ];

    note("single-key sort: sort_by_key gives the sort basis");
    let mut by_age = people.clone();
    by_age.sort_by_key(|e| e.age);
    show("by age ascending", names(&by_age));

    note("multi-key sort: sort_by + Ordering::then (dept ascending, age descending)");
    let mut multi = people.clone();
    multi.sort_by(|a, b| a.dept.cmp(&b.dept).then(b.age.cmp(&a.age)));
    show("dept↑ then age↓", names(&multi));

    note("sort is stable: same dept keeps its original relative order (Alice before Carol)");
    let mut stable = people.clone();
    stable.sort_by_key(|e| e.dept.clone());
    show("stable sort", names(&stable));

    note("equality: #[derive(PartialEq)] compares field by field");
    let a = emp("Alice", "eng", 30);
    let b = a.clone();
    show("a == b", a == b);

    note("#[derive(Eq, Hash)] → usable as a HashSet key, naturally deduped by value");
    let set: HashSet<Employee> = people.iter().cloned().chain([a]).collect();
    show("count after dedup", set.len()); // Alice is a duplicate → still 4

    note("custom Ord: once cmp is implemented you can use < > and sort");
    let mut versions = vec![
        Version { major: 2, minor: 0 },
        Version { major: 1, minor: 5 },
        Version { major: 1, minor: 2 },
    ];
    versions.sort();
    show("sorted versions", &versions);
    show(
        "Version(1,2) < Version(1,5)",
        Version { major: 1, minor: 2 } < Version { major: 1, minor: 5 },
    );
}
