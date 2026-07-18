package demos

import (
	"fmt"

	"proglang/internal/logx"
)

type counter struct{ n int }

// byValue receives a copy of the value: cannot affect the caller.
func byValue(c counter) { c.n = 999 }

// byPointer receives a pointer: can modify the caller's original object.
func byPointer(c *counter) { c.n = 999 }

// Memory demonstrates pointer and value semantics.
// Key points:
//  1. Go has real pointers *T and address-of &, but no pointer arithmetic (safer than C).
//  2. Function arguments are always "passed by value" — passing a struct copies it, passing a pointer copies the pointer (still pointing at the same object).
//  3. To modify an object inside a function, pass *T; passing a pointer to a large read-only struct also saves a copy.
//  4. new(T) returns *T (zero value); make is for initializing slice/map/channel.
//  5. Returning the address of a local variable is also safe: escape analysis automatically allocates it on the heap.
func Memory() {
	logx.Title("11 Pointer and value semantics")

	logx.Note("pass by value: the function gets a copy and can't affect the outside")
	c := counter{n: 1}
	byValue(c)
	logx.Show("c.n after byValue", c.n) // still 1

	logx.Note("pass by pointer: gets the address and can modify the original object")
	byPointer(&c)
	logx.Show("c.n after byPointer", c.n) // becomes 999

	logx.Note("& takes an address, * dereferences")
	x := 42
	p := &x
	*p = 100
	logx.Show("x after *p change", x)
	logx.Show("p is an address", fmt.Sprintf("%p points to %d", p, *p))

	logx.Note("new returns a pointer to the zero value; dereferencing a nil pointer panics (check for nil first)")
	np := new(counter) // *counter, points at the zero value
	logx.Show("new(counter).n", np.n)

	logx.Note("slices/maps are reference types: copying the variable still shares the underlying data")
	a := []int{1, 2, 3}
	b := a // copies the slice header; the underlying array is shared
	b[0] = 99
	logx.Show("changing b[0] affects a", a[0])

	logx.Note("returning the address of a local variable is safe (escape analysis moves it to the heap)")
	makeCounter := func() *counter { c := counter{n: 7}; return &c }
	logx.Show("return local address", makeCounter().n)
}
