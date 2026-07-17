package demos

import (
	"iter"
	"slices"

	"proglang/internal/logx"
)

// Iterators 演示迭代器（Go 1.23 起的 range-over-func）。
// 要点：
//  1. iter.Seq[T] 就是 func(yield func(T) bool)：把每个值交给 yield。
//  2. yield 返回 false 表示下游要停了（比如 break），生产者应立即返回。
//  3. for v := range seq 直接遍历这种「函数式迭代器」（1.23 新特性）。
//  4. 惰性：值在被 range 取时才算，所以能表示无限序列。
//  5. slices.Collect 把迭代器物化成切片；slices.Values 把切片变回迭代器。
func Iterators() {
	logx.Title("13 迭代器（range-over-func, 1.23）")

	logx.Note("自定义 iter.Seq：range 直接遍历")
	got := []int{}
	for v := range count(5) {
		got = append(got, v)
	}
	logx.Show("range count(5)", got)

	logx.Note("slices.Collect：把迭代器物化成切片")
	logx.Show("slices.Collect(count(5))", slices.Collect(count(5)))

	logx.Note("无限序列 + take：惰性，只算需要的部分")
	logx.Show("take(fibSeq, 10)", slices.Collect(take(fibSeq(), 10)))

	logx.Note("惰性流水线：mapSeq 不产生中间切片")
	squares := mapSeq(fibSeq(), func(n int) int { return n * n })
	logx.Show("fib 平方前 5 个", slices.Collect(take(squares, 5)))

	logx.Note("yield 返回 false 会提前结束生产（这里 range 里 break）")
	first := -1
	for v := range fibSeq() {
		if v > 10 {
			first = v
			break // 触发 yield 返回 false，fibSeq 随即 return
		}
	}
	logx.Show("第一个 >10 的斐波那契", first)
}

// count 返回 0..n-1 的迭代器。
func count(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 0; i < n; i++ {
			if !yield(i) { // 下游不想要了就停
				return
			}
		}
	}
}

// fibSeq 是无限斐波那契迭代器。
func fibSeq() iter.Seq[int] {
	return func(yield func(int) bool) {
		a, b := 0, 1
		for {
			if !yield(a) {
				return
			}
			a, b = b, a+b
		}
	}
}

// mapSeq 惰性变换：进 Seq[T]，出 Seq[R]。
func mapSeq[T, R any](s iter.Seq[T], fn func(T) R) iter.Seq[R] {
	return func(yield func(R) bool) {
		for v := range s {
			if !yield(fn(v)) {
				return
			}
		}
	}
}

// take 只取前 n 个。
func take[T any](s iter.Seq[T], n int) iter.Seq[T] {
	return func(yield func(T) bool) {
		i := 0
		for v := range s {
			if i >= n || !yield(v) {
				return
			}
			i++
		}
	}
}
