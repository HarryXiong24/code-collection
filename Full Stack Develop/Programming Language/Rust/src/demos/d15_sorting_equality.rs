use crate::log::{note, show, title};
use std::cmp::Ordering;
use std::collections::HashSet;

/// 自定义排序与相等性 —— sort_by_key / sort_by、derive 相等与哈希、自定义 Ord。
/// 要点：
///   1. sort_by_key 取排序键；sort_by 用比较器返回 Ordering。
///   2. 多键排序用 Ordering::then 串联。
///   3. sort 稳定；sort_unstable 更快但不保证相等元素顺序。
///   4. #[derive(PartialEq, Eq, Hash)] → 按值判等、可作 HashSet/HashMap 键。
///   5. 自己实现 Ord 就能用 < > 和 sort。

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Employee {
    name: String,
    dept: String,
    age: u32,
}

// 自定义 Ord：先比 major 再比 minor
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
    title("15 自定义排序与相等性");

    let people = vec![
        emp("Alice", "eng", 30),
        emp("Bob", "sales", 25),
        emp("Carol", "eng", 25),
        emp("Dave", "sales", 40),
    ];

    note("单键排序：sort_by_key 取排序依据");
    let mut by_age = people.clone();
    by_age.sort_by_key(|e| e.age);
    show("按 age 升序", names(&by_age));

    note("多键排序：sort_by + Ordering::then（dept 升序, age 降序）");
    let mut multi = people.clone();
    multi.sort_by(|a, b| a.dept.cmp(&b.dept).then(b.age.cmp(&a.age)));
    show("dept↑ 再 age↓", names(&multi));

    note("sort 稳定：同 dept 保持原始相对顺序（Alice 在 Carol 前）");
    let mut stable = people.clone();
    stable.sort_by_key(|e| e.dept.clone());
    show("稳定排序", names(&stable));

    note("相等性：#[derive(PartialEq)] 按字段逐一比较");
    let a = emp("Alice", "eng", 30);
    let b = a.clone();
    show("a == b", a == b);

    note("#[derive(Eq, Hash)] → 可作 HashSet 键，天然按值去重");
    let set: HashSet<Employee> = people.iter().cloned().chain([a]).collect();
    show("去重后数量", set.len()); // Alice 重复 → 仍是 4

    note("自定义 Ord：实现 cmp 后即可 < > 和 sort");
    let mut versions = vec![
        Version { major: 2, minor: 0 },
        Version { major: 1, minor: 5 },
        Version { major: 1, minor: 2 },
    ];
    versions.sort();
    show("排序版本", &versions);
    show(
        "Version(1,2) < Version(1,5)",
        Version { major: 1, minor: 2 } < Version { major: 1, minor: 5 },
    );
}
