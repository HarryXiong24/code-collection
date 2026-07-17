use crate::log::{note, show, title};
use std::collections::{HashMap, HashSet};

/// 集合类型 —— 数组 / Vec / 元组 / HashMap / HashSet。
/// 要点：
///   1. 数组 [T; N] 定长在栈上；Vec<T> 变长在堆上。
///   2. 切片 &[T] 是「借用的视图」，函数参数首选它，兼容数组和 Vec。
///   3. HashMap / HashSet 是哈希表；遍历顺序随机（本 demo 排序后再展示）。
///   4. 迭代器适配器 map/filter/collect 是惯用的「函数式」处理方式。
pub fn run() {
    title("02 集合类型");

    note("数组 [T; N] 定长；Vec<T> 变长");
    let arr = [1, 2, 3];
    let mut nums = vec![3, 1, 4, 1, 5, 9];
    show("array [i32; 3]", arr);
    show("vec", &nums);
    nums.push(2);
    show("after push(2)", &nums);

    note("迭代器链：map/filter/collect（惰性，collect 才求值）");
    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
    show("map *2", &doubled);
    let big: Vec<i32> = nums.iter().copied().filter(|&x| x > 3).collect();
    show("filter > 3", &big);
    show("sum", nums.iter().sum::<i32>());

    note("排序要显式（sort 原地改），先 clone 保留原序");
    let mut sorted = nums.clone();
    sorted.sort();
    show("sorted", &sorted);

    note("HashMap：键值表，get 返回 Option");
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("alice", 95);
    scores.insert("bob", 82);
    show("scores.get(\"alice\")", scores.get("alice")); // Some(95)
    show("contains_key(\"bob\")", scores.contains_key("bob"));
    show("len", scores.len());

    note("HashSet：自动去重；交集用 intersection");
    let set: HashSet<i32> = [1, 2, 2, 3, 3, 3].into_iter().collect();
    show("set len (6 个输入)", set.len());
    let a: HashSet<i32> = [1, 2, 3].into_iter().collect();
    let b: HashSet<i32> = [2, 3, 4].into_iter().collect();
    let mut inter: Vec<i32> = a.intersection(&b).copied().collect();
    inter.sort();
    show("intersection a & b", &inter);

    note("切片模式：split_first 取头 + 余下");
    let (first, rest) = nums.split_first().unwrap();
    show("first", *first);
    show("rest", rest);
}
