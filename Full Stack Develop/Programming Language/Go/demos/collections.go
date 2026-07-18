package demos

import (
	"fmt"
	"slices"

	"proglang/internal/logx"
)

// Collections demonstrates collection types.
// Key points:
//  1. An array [N]T is fixed-length and a value type; a slice []T is variable-length and a view over an array (reference semantics).
//  2. map[K]V is a hash table; when reading you can use "comma ok" to check whether a key exists.
//  3. Go has no built-in set; the idiom is map[T]struct{} (the value takes no space).
//  4. Slices grow via append; when capacity runs out they grow automatically and may swap the underlying array.
//  5. The standard library slices / maps (1.21+) provide generic helpers like Sort / Contains / Keys.
func Collections() {
	logx.Title("02 Collection types")

	logx.Note("arrays are fixed-length, slices variable-length; day to day you use slices almost exclusively")
	arr := [3]int{1, 2, 3}       // array: the length is part of the type
	nums := []int{3, 1, 4, 1, 5} // slice
	logx.Show("array [3]int", arr)
	logx.Show("slice []int", nums)

	logx.Note("append adds; the slice s[lo:hi] takes a sub-slice (includes lo, excludes hi)")
	nums = append(nums, 9, 2)
	logx.Show("append(nums, 9, 2)", nums)
	logx.Show("nums[1:4]", nums[1:4])

	logx.Note("the slices package: sort / search / check (generic, 1.21+)")
	sorted := slices.Clone(nums)
	slices.Sort(sorted)
	logx.Show("slices.Sort", sorted)
	logx.Show("slices.Contains(nums, 4)", slices.Contains(nums, 4))
	logx.Show("slices.Max(nums)", slices.Max(nums))

	logx.Note("map: a hash table, comma ok checks whether a key exists")
	scores := map[string]int{"alice": 95, "bob": 82}
	scores["carol"] = 78
	v, ok := scores["zoe"]
	logx.Show("scores[\"alice\"]", scores["alice"])
	logx.Show("scores[\"zoe\"] (v, ok)", fmt.Sprintf("%d, %t", v, ok))
	delete(scores, "bob")
	logx.Show("len after delete", len(scores))

	logx.Note("set idiom: map[T]struct{}, where struct{} takes zero memory")
	set := map[int]struct{}{}
	for _, n := range []int{1, 2, 2, 3, 3, 3} {
		set[n] = struct{}{}
	}
	keys := make([]int, 0, len(set))
	for k := range set {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	logx.Show("deduplicated keys", keys)

	logx.Note("slices have reference semantics: passing to a function or re-slicing means element changes affect each other")
	shared := nums[:2]
	shared[0] = 999
	logx.Show("changing shared[0] affects nums", nums[0])
}
