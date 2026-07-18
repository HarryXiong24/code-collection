package demos

import (
	"fmt"
	"strconv"

	"proglang/internal/logx"
)

// Types demonstrates types and variables.
// Key points:
//  1. var declarations may carry a type or infer it; := is shorthand for "declare and infer" (only usable inside a function).
//  2. Basic types: bool / string / int / int64 / float64 / rune / byte, etc., with clear boundaries.
//  3. Go does no implicit numeric conversion — adding an int and an int64 requires an explicit conversion.
//  4. Every type has a "zero value": 0 for numbers, "" for strings, false for bool, nil for pointers.
//  5. const is a compile-time constant; iota generates incrementing enum values.
func Types() {
	logx.Title("01 Types & variables")

	logx.Note("var declares explicitly; := declares and infers (only inside a function)")
	var name string = "Harry"
	age := 30     // inferred as int
	price := 9.99 // inferred as float64
	isVip := true // inferred as bool
	logx.Show("name / age / price / isVip", fmt.Sprintf("%s / %d / %.2f / %t", name, age, price, isVip))

	logx.Note("zero values: an uninitialized variable has a definite default, not garbage")
	var (
		zeroInt int
		zeroStr string
		zeroBl  bool
	)
	logx.Show("zero int / bool", fmt.Sprintf("%d / %t", zeroInt, zeroBl))
	logx.Show("zero string == \"\"", zeroStr == "")

	logx.Note("no implicit conversion: different numeric types must be converted explicitly before arithmetic")
	var i int = 7
	var f float64 = 2.0
	logx.Show("float64(i) / f", float64(i)/f)

	logx.Note("a rune is an int32 (a single Unicode code point), a byte is a uint8")
	s := "Go语言"
	logx.Show("len(s) byte count", len(s))              // by bytes
	logx.Show("[]rune(s) character count", len([]rune(s))) // by characters
	for i, r := range "Aあ" {
		logx.Show(fmt.Sprintf("rune@%d", i), fmt.Sprintf("%c (U+%04X)", r, r))
	}

	logx.Note("const + iota: generates a group of incrementing constants (the basis of enums)")
	const (
		Sunday  = iota // 0
		Monday         // 1
		Tuesday        // 2
	)
	logx.Show("iota Sunday/Monday/Tuesday", []int{Sunday, Monday, Tuesday})

	logx.Note("string ↔ number uses strconv, no implicit conversion")
	n, _ := strconv.Atoi("42")
	logx.Show("strconv.Atoi(\"42\")", n)
	logx.Show("strconv.Itoa(7)", strconv.Itoa(7))
}
