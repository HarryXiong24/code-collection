package demos

import (
	"cmp"
	"slices"

	"proglang/internal/logx"
)

// employee is used for the sorting/equality demo. Its fields are all comparable types (string/int),
// so the whole struct can be compared with == and used directly as a map key.
type employee struct {
	Name string
	Dept string
	Age  int
}

// SortingEquality demonstrates custom sorting and equality.
// Key points:
//  1. slices.SortFunc takes a cmp function (returns negative/0/positive); cmp.Compare compares magnitude directly.
//  2. Multi-key sorting uses cmp.Or (1.22+): returns the first non-zero comparison result.
//  3. SortStableFunc preserves the original order of equal elements; SortFunc does not guarantee stability.
//  4. As long as the fields are all comparable, a struct can be compared field by field with == and used as a map key.
//  5. A struct containing slice/map/func fields is not comparable and cannot be a map key.
func SortingEquality() {
	logx.Title("15 Custom sorting and equality")

	people := []employee{
		{"Alice", "eng", 30},
		{"Bob", "sales", 25},
		{"Carol", "eng", 25},
		{"Dave", "sales", 40},
	}

	note1 := slices.Clone(people)
	slices.SortFunc(note1, func(a, b employee) int { return cmp.Compare(a.Age, b.Age) })
	logx.Note("single-key sort: cmp.Compare on age")
	logx.Show("by age ascending", empNames(note1))

	logx.Note("multi-key sort: cmp.Or chained — dept ascending, then age descending within the same dept")
	multi := slices.Clone(people)
	slices.SortFunc(multi, func(a, b employee) int {
		return cmp.Or(
			cmp.Compare(a.Dept, b.Dept),
			cmp.Compare(b.Age, a.Age), // swapping a and b makes it descending
		)
	})
	logx.Show("dept↑ then age↓", empNames(multi))

	logx.Note("stable sort: sort by dept only, keeping the original order within a group (Alice before Carol)")
	stable := slices.Clone(people)
	slices.SortStableFunc(stable, func(a, b employee) int { return cmp.Compare(a.Dept, b.Dept) })
	logx.Show("SortStableFunc", empNames(stable))

	logx.Note("equality: for a struct whose fields are all comparable, == is a field-by-field comparison")
	a := employee{"Alice", "eng", 30}
	b := employee{"Alice", "eng", 30}
	logx.Show("a == b", a == b)

	logx.Note("a comparable struct can be a map key directly — naturally deduplicated by value")
	seen := map[employee]struct{}{}
	for _, p := range append(slices.Clone(people), a) {
		seen[p] = struct{}{}
	}
	logx.Show("count after dedup by value", len(seen)) // a equals the existing Alice → no new entry
}

func empNames(es []employee) []string {
	out := make([]string, len(es))
	for i, e := range es {
		out[i] = e.Name
	}
	return out
}
