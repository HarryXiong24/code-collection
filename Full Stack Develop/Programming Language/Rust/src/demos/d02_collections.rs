use crate::log::{note, show, title};
use std::collections::{HashMap, HashSet};

/// Collection types — array / Vec / tuple / HashMap / HashSet.
/// Key points:
///   1. An array [T; N] is fixed-length on the stack; Vec<T> is variable-length on the heap.
///   2. A slice &[T] is a "borrowed view", the preferred function parameter, compatible with arrays and Vec.
///   3. HashMap / HashSet are hash tables; iteration order is random (this demo sorts before displaying).
///   4. Iterator adapters map/filter/collect are the idiomatic "functional" way to process data.
pub fn run() {
    title("02 Collection types");

    note("array [T; N] is fixed-length; Vec<T> is variable-length");
    let arr = [1, 2, 3];
    let mut nums = vec![3, 1, 4, 1, 5, 9];
    show("array [i32; 3]", arr);
    show("vec", &nums);
    nums.push(2);
    show("after push(2)", &nums);

    note("iterator chain: map/filter/collect (lazy, evaluated only at collect)");
    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
    show("map *2", &doubled);
    let big: Vec<i32> = nums.iter().copied().filter(|&x| x > 3).collect();
    show("filter > 3", &big);
    show("sum", nums.iter().sum::<i32>());

    note("sorting must be explicit (sort mutates in place); clone first to keep the original order");
    let mut sorted = nums.clone();
    sorted.sort();
    show("sorted", &sorted);

    note("HashMap: a key-value table, get returns Option");
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("alice", 95);
    scores.insert("bob", 82);
    show("scores.get(\"alice\")", scores.get("alice")); // Some(95)
    show("contains_key(\"bob\")", scores.contains_key("bob"));
    show("len", scores.len());

    note("HashSet: automatic dedup; use intersection for the intersection");
    let set: HashSet<i32> = [1, 2, 2, 3, 3, 3].into_iter().collect();
    show("set len (6 inputs)", set.len());
    let a: HashSet<i32> = [1, 2, 3].into_iter().collect();
    let b: HashSet<i32> = [2, 3, 4].into_iter().collect();
    let mut inter: Vec<i32> = a.intersection(&b).copied().collect();
    inter.sort();
    show("intersection a & b", &inter);

    note("slice pattern: split_first takes the head + the rest");
    let (first, rest) = nums.split_first().unwrap();
    show("first", *first);
    show("rest", rest);
}
