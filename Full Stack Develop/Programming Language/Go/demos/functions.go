package demos

import (
	"fmt"
	"strings"

	"proglang/internal/logx"
)

// add is an ordinary function: both parameters and the return value are typed.
func add(a, b int) int { return a + b } // same-type parameters can be merged as a, b int

// divmod has multiple return values: Go's signature feature, often used for "result + error".
func divmod(a, b int) (int, int) { return a / b, a % b }

// sum takes variadic parameters: inside the function nums is a []int.
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// namedReturn uses named return values + defer: defer can modify a named return value after return.
func namedReturn() (result string) {
	result = "A"
	defer func() { result += "-deferred" }() // runs just before actually returning
	return result
}

// multiplier is a higher-order function: returns a closure that remembers factor.
func multiplier(factor int) func(int) int {
	return func(n int) int { return n * factor }
}

// Functions demonstrates functions.
// Key points:
//  1. Multiple return values are supported; by convention the last returned value is an error.
//  2. Variadic parameters ...T; named return values paired with defer are common.
//  3. Functions are first-class citizens: passable as arguments and returnable → higher-order functions and closures.
//  4. Calls registered with defer run just before the function returns in last-in-first-out order, commonly used to release resources.
func Functions() {
	logx.Title("03 Functions")

	logx.Show("add(2, 3)", add(2, 3))

	logx.Note("multiple return values: get the quotient and remainder at once")
	q, r := divmod(17, 5)
	logx.Show("divmod(17, 5)", fmt.Sprintf("q=%d r=%d", q, r))

	logx.Note("variadic parameters: pass any number, like spreading")
	logx.Show("sum(1,2,3,4)", sum(1, 2, 3, 4))
	logx.Show("sum(slice...)", sum([]int{10, 20, 30}...)) // use ... to spread a slice

	logx.Note("named return values + defer: defer can still change the return value after return")
	logx.Show("namedReturn()", namedReturn())

	logx.Note("closures: the returned function remembers the outer factor")
	triple := multiplier(3)
	logx.Show("triple(10)", triple(10))

	logx.Note("functions as arguments: pass behavior in")
	apply := func(s string, fn func(string) string) string { return fn(s) }
	logx.Show("apply(\"hi\", ToUpper)", apply("hi", strings.ToUpper))

	logx.Note("defer is last-in-first-out (LIFO)")
	order := []int{}
	func() {
		for i := 1; i <= 3; i++ {
			defer func(n int) { order = append(order, n) }(i)
		}
	}()
	logx.Show("defer execution order", order) // [3 2 1]
}
