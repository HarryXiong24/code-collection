package demos

import (
	"fmt"
	"slices"

	"proglang/internal/logx"
)

// Collections 演示集合类型。
// 要点：
//  1. 数组 [N]T 定长、是值类型；切片 []T 变长、是对数组的视图（引用语义）。
//  2. map[K]V 是哈希表；取值可用「逗号 ok」判断键是否存在。
//  3. Go 没有内置 set，惯用 map[T]struct{}（value 不占空间）。
//  4. 切片用 append 增长；容量不够会自动扩容并可能换底层数组。
//  5. 标准库 slices / maps（1.21+）提供 Sort / Contains / Keys 等泛型工具。
func Collections() {
	logx.Title("02 集合类型")

	logx.Note("数组定长、切片变长；日常几乎只用切片")
	arr := [3]int{1, 2, 3}       // 数组：长度是类型的一部分
	nums := []int{3, 1, 4, 1, 5} // 切片
	logx.Show("array [3]int", arr)
	logx.Show("slice []int", nums)

	logx.Note("append 追加；切片 s[lo:hi] 取子片（含 lo 不含 hi）")
	nums = append(nums, 9, 2)
	logx.Show("append(nums, 9, 2)", nums)
	logx.Show("nums[1:4]", nums[1:4])

	logx.Note("slices 包：排序 / 查找 / 判断（泛型，1.21+）")
	sorted := slices.Clone(nums)
	slices.Sort(sorted)
	logx.Show("slices.Sort", sorted)
	logx.Show("slices.Contains(nums, 4)", slices.Contains(nums, 4))
	logx.Show("slices.Max(nums)", slices.Max(nums))

	logx.Note("map：哈希表，逗号 ok 判断键是否存在")
	scores := map[string]int{"alice": 95, "bob": 82}
	scores["carol"] = 78
	v, ok := scores["zoe"]
	logx.Show("scores[\"alice\"]", scores["alice"])
	logx.Show("scores[\"zoe\"] (v, ok)", fmt.Sprintf("%d, %t", v, ok))
	delete(scores, "bob")
	logx.Show("delete 后 len", len(scores))

	logx.Note("set 惯用法：map[T]struct{}，struct{} 零内存占用")
	set := map[int]struct{}{}
	for _, n := range []int{1, 2, 2, 3, 3, 3} {
		set[n] = struct{}{}
	}
	keys := make([]int, 0, len(set))
	for k := range set {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	logx.Show("去重后的 keys", keys)

	logx.Note("切片是引用语义：传给函数或再切片，改元素会互相影响")
	shared := nums[:2]
	shared[0] = 999
	logx.Show("改 shared[0] 影响 nums", nums[0])
}
