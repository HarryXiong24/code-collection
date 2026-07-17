package demos

import (
	"cmp"

	"proglang/internal/logx"
)

// Map 泛型函数：把 []T 变成 []R。[T, R any] 是类型参数。
func Map[T, R any](s []T, fn func(T) R) []R {
	out := make([]R, len(s))
	for i, v := range s {
		out[i] = fn(v)
	}
	return out
}

// Max 约束 cmp.Ordered：只接受可比较大小的类型（数字、字符串等）。
func Max[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Number 是自定义约束：type set，列出允许的底层类型。
type Number interface {
	~int | ~int64 | ~float64
}

// Sum 只接受满足 Number 约束的切片。
func Sum[T Number](nums []T) T {
	var total T
	for _, n := range nums {
		total += n
	}
	return total
}

// Stack 泛型类型：一个类型安全的栈。
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

// Generics 演示泛型（Go 1.18+）。
// 要点：
//  1. [T any] 声明类型参数；调用时通常能自动推断。
//  2. 约束用接口表达：cmp.Ordered、comparable，或自定义 type set（~int | ...）。
//  3. 泛型可用于函数和类型（如 Stack[T]）。
//  4. ~int 里的 ~ 表示「底层类型是 int 的都算」，覆盖自定义类型。
func Generics() {
	logx.Title("06 泛型")

	logx.Note("泛型 Map：int 切片 → string 切片，类型自动推断")
	doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
	logx.Show("Map(nums, *2)", doubled)

	logx.Note("cmp.Ordered 约束：数字、字符串都能比")
	logx.Show("Max(3, 9)", Max(3, 9))
	logx.Show("Max(\"abc\", \"abd\")", Max("abc", "abd"))

	logx.Note("自定义 type set 约束：只接受数值类型")
	logx.Show("Sum([]int{1,2,3})", Sum([]int{1, 2, 3}))
	logx.Show("Sum([]float64{1.5,2.5})", Sum([]float64{1.5, 2.5}))

	logx.Note("泛型类型 Stack[int]：只存 int")
	st := &Stack[int]{}
	st.Push(1)
	st.Push(2)
	v, _ := st.Pop()
	logx.Show("stack.Pop()", v)
}
