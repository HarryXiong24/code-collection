package demos

import (
	"cmp"

	"proglang/internal/logx"
)

// Map is a generic function: turns []T into []R. [T, R any] are the type parameters.
func Map[T, R any](s []T, fn func(T) R) []R {
	out := make([]R, len(s))
	for i, v := range s {
		out[i] = fn(v)
	}
	return out
}

// Max is constrained by cmp.Ordered: accepts only types that can be ordered (numbers, strings, etc.).
func Max[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Number is a custom constraint: a type set listing the permitted underlying types.
type Number interface {
	~int | ~int64 | ~float64
}

// Sum accepts only slices that satisfy the Number constraint.
func Sum[T Number](nums []T) T {
	var total T
	for _, n := range nums {
		total += n
	}
	return total
}

// Stack is a generic type: a type-safe stack.
type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}

// Generics demonstrates generics (Go 1.18+).
// Key points:
//  1. [T any] declares a type parameter; at the call site it can usually be inferred automatically.
//  2. Constraints are expressed with interfaces: cmp.Ordered, comparable, or a custom type set (~int | ...).
//  3. Generics work for both functions and types (like Stack[T]).
//  4. The ~ in ~int means "anything whose underlying type is int counts", covering custom types.
func Generics() {
	logx.Title("06 Generics")

	logx.Note("generic Map: int slice → string slice, type inferred automatically")
	doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
	logx.Show("Map(nums, *2)", doubled)

	logx.Note("cmp.Ordered constraint: numbers and strings can both be compared")
	logx.Show("Max(3, 9)", Max(3, 9))
	logx.Show("Max(\"abc\", \"abd\")", Max("abc", "abd"))

	logx.Note("custom type set constraint: accepts only numeric types")
	logx.Show("Sum([]int{1,2,3})", Sum([]int{1, 2, 3}))
	logx.Show("Sum([]float64{1.5,2.5})", Sum([]float64{1.5, 2.5}))

	logx.Note("generic type Stack[int]: stores only int")
	st := &Stack[int]{}
	st.Push(1)
	st.Push(2)
	v, _ := st.Pop()
	logx.Show("stack.Pop()", v)
}
