package demos

import (
	"iter"
	"slices"

	"proglang/internal/logx"
)

// Iterators demonstrates iterators (range-over-func, since Go 1.23).
// Key points:
//  1. iter.Seq[T] is just func(yield func(T) bool): hand each value to yield.
//  2. yield returning false means the consumer wants to stop (e.g. break), so the producer should return immediately.
//  3. for v := range seq iterates such a "functional iterator" directly (the 1.23 feature).
//  4. Lazy: values are computed only when range pulls them, so it can represent infinite sequences.
//  5. slices.Collect materializes an iterator into a slice; slices.Values turns a slice back into an iterator.
func Iterators() {
	logx.Title("13 Iterators (range-over-func, 1.23)")

	logx.Note("a custom iter.Seq: range iterates it directly")
	got := []int{}
	for v := range count(5) {
		got = append(got, v)
	}
	logx.Show("range count(5)", got)

	logx.Note("slices.Collect: materialize an iterator into a slice")
	logx.Show("slices.Collect(count(5))", slices.Collect(count(5)))

	logx.Note("infinite sequence + take: lazy, computes only what's needed")
	logx.Show("take(fibSeq, 10)", slices.Collect(take(fibSeq(), 10)))

	logx.Note("lazy pipeline: mapSeq produces no intermediate slice")
	squares := mapSeq(fibSeq(), func(n int) int { return n * n })
	logx.Show("first 5 fib squares", slices.Collect(take(squares, 5)))

	logx.Note("yield returning false ends production early (here break inside range)")
	first := -1
	for v := range fibSeq() {
		if v > 10 {
			first = v
			break // triggers yield to return false, and fibSeq returns right after
		}
	}
	logx.Show("first Fibonacci >10", first)
}

// count returns an iterator over 0..n-1.
func count(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 0; i < n; i++ {
			if !yield(i) { // stop as soon as the consumer no longer wants values
				return
			}
		}
	}
}

// fibSeq is an infinite Fibonacci iterator.
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

// mapSeq is a lazy transform: takes Seq[T], returns Seq[R].
func mapSeq[T, R any](s iter.Seq[T], fn func(T) R) iter.Seq[R] {
	return func(yield func(R) bool) {
		for v := range s {
			if !yield(fn(v)) {
				return
			}
		}
	}
}

// take yields only the first n elements.
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
