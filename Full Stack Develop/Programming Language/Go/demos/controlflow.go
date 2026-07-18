package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// ControlFlow demonstrates control flow.
// Key points:
//  1. Go has a single loop keyword, for, which covers while / infinite loop / range in three forms.
//  2. if can carry an initializer statement: if v, ok := m[k]; ok { ... }.
//  3. switch auto-breaks by default, no need to write break; use fallthrough to fall through.
//  4. switch may omit its expression, acting as a clearer if-else chain.
//  5. range over a slice gives (index, value), over a map gives (key, value).
func ControlFlow() {
	logx.Title("04 Control flow")

	logx.Note("if with an initializer statement: the variable's scope is limited to that if")
	m := map[string]int{"a": 1}
	if v, ok := m["a"]; ok {
		logx.Show("if init: m[\"a\"]", v)
	}

	logx.Note("the three forms of for: counting / while-like / infinite (here we run only counting and while)")
	total := 0
	for i := 1; i <= 5; i++ {
		total += i
	}
	logx.Show("for counting 1..5 summed", total)

	n := 3
	collected := []int{}
	for n > 0 { // no while; a for with a single condition is a while
		collected = append(collected, n)
		n--
	}
	logx.Show("for used as while", collected)

	logx.Note("range: a slice gives (index,value), a map gives (key,value)")
	for i, c := range []string{"x", "y", "z"} {
		logx.Show(fmt.Sprintf("idx %d", i), c)
	}

	logx.Note("switch auto-breaks, no need to write it; a case can have multiple values")
	grade := func(score int) string {
		switch {
		case score >= 90:
			return "A"
		case score >= 80:
			return "B"
		default:
			return "C"
		}
	}
	logx.Show("grade(82)", grade(82))

	logx.Note("type switch: dispatch on the dynamic type of an any")
	describe := func(x any) string {
		switch v := x.(type) {
		case int:
			return fmt.Sprintf("int:%d", v)
		case string:
			return fmt.Sprintf("string:%s", v)
		default:
			return "unknown"
		}
	}
	logx.Show("describe(42)", describe(42))
	logx.Show("describe(\"hi\")", describe("hi"))
}
