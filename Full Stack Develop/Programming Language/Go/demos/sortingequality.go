package demos

import (
	"cmp"
	"slices"

	"proglang/internal/logx"
)

// employee 用于排序/相等性演示。字段都是可比较类型（string/int），
// 所以整个结构体可以用 == 比较，也能直接当 map 的键。
type employee struct {
	Name string
	Dept string
	Age  int
}

// SortingEquality 演示自定义排序与相等性。
// 要点：
//  1. slices.SortFunc 接收 cmp 函数（返回负/0/正）；cmp.Compare 直接比大小。
//  2. 多键排序用 cmp.Or（1.22+）：返回第一个非 0 的比较结果。
//  3. SortStableFunc 保持相等元素的原始顺序；SortFunc 不保证稳定。
//  4. 只要字段都可比较，结构体就能用 == 逐字段比较，并能作 map 键。
//  5. 含 slice/map/func 字段的结构体不可比较，也不能作 map 键。
func SortingEquality() {
	logx.Title("15 自定义排序与相等性")

	people := []employee{
		{"Alice", "eng", 30},
		{"Bob", "sales", 25},
		{"Carol", "eng", 25},
		{"Dave", "sales", 40},
	}

	note1 := slices.Clone(people)
	slices.SortFunc(note1, func(a, b employee) int { return cmp.Compare(a.Age, b.Age) })
	logx.Note("单键排序：cmp.Compare 比 age")
	logx.Show("按 age 升序", empNames(note1))

	logx.Note("多键排序：cmp.Or 串联 —— dept 升序，同 dept 再 age 降序")
	multi := slices.Clone(people)
	slices.SortFunc(multi, func(a, b employee) int {
		return cmp.Or(
			cmp.Compare(a.Dept, b.Dept),
			cmp.Compare(b.Age, a.Age), // a、b 反过来即降序
		)
	})
	logx.Show("dept↑ 再 age↓", empNames(multi))

	logx.Note("稳定排序：只按 dept 排，同组内保持原序（Alice 在 Carol 前）")
	stable := slices.Clone(people)
	slices.SortStableFunc(stable, func(a, b employee) int { return cmp.Compare(a.Dept, b.Dept) })
	logx.Show("SortStableFunc", empNames(stable))

	logx.Note("相等性：字段全可比较的结构体，== 就是逐字段比较")
	a := employee{"Alice", "eng", 30}
	b := employee{"Alice", "eng", 30}
	logx.Show("a == b", a == b)

	logx.Note("可比较结构体能直接作 map 键 —— 天然按值去重")
	seen := map[employee]struct{}{}
	for _, p := range append(slices.Clone(people), a) {
		seen[p] = struct{}{}
	}
	logx.Show("按值去重后数量", len(seen)) // a 与已有 Alice 相等 → 不新增
}

func empNames(es []employee) []string {
	out := make([]string, len(es))
	for i, e := range es {
		out[i] = e.Name
	}
	return out
}
