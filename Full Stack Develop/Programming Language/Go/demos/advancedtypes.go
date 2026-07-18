package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// Status is a "defined type": the underlying type is int, but it is a distinct type from int and needs explicit conversion.
type Status int

const (
	StatusActive Status = iota // 0
	StatusPaused               // 1
	StatusClosed               // 2
)

// String implements fmt.Stringer so the enum prints its name instead of a number — Go's "enum" idiom.
func (s Status) String() string {
	switch s {
	case StatusActive:
		return "ACTIVE"
	case StatusPaused:
		return "PAUSED"
	case StatusClosed:
		return "CLOSED"
	default:
		return fmt.Sprintf("Status(%d)", int(s))
	}
}

// Celsius / Fahrenheit: a defined type brings "units" into the type system, preventing mix-ups.
type Celsius float64
type Fahrenheit float64

func (c Celsius) ToF() Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// MyID is a "type alias": exactly the same as int, just a different name (note the = sign).
type MyID = int

// AdvancedTypes demonstrates advanced types.
// Key points:
//  1. A defined type (type X int) creates a new type; paired with iota + String() it becomes an enum.
//  2. A type alias (type X = int) is only an alias, fully interchangeable with the original type.
//  3. Use a defined type to add type safety to "units/IDs", preventing wrong arguments.
//  4. any (= interface{}) + a type assertion v, ok := x.(T) retrieves the concrete type at runtime.
func AdvancedTypes() {
	logx.Title("09 Advanced types")

	logx.Note("iota enum + Stringer: prints the name, forward and reverse lookups both work")
	logx.Show("StatusActive", StatusActive)           // goes through String()
	logx.Show("int(StatusClosed)", int(StatusClosed)) // the underlying value
	logx.Show("all statuses", []Status{StatusActive, StatusPaused, StatusClosed})

	logx.Note("defined type brings units into the type system: Celsius won't be mistaken for a plain float64")
	body := Celsius(37)
	logx.Show("37°C → °F", body.ToF())

	logx.Note("type alias: MyID is just int, directly interchangeable")
	var id MyID = 42
	logx.Show("MyID + int", id+8)

	logx.Note("type assertion: safely retrieve the concrete type from an any")
	var x any = "hello"
	if s, ok := x.(string); ok {
		logx.Show("x.(string)", s)
	}
	if _, ok := x.(int); !ok {
		logx.Show("x.(int) fails", "ok=false, no panic")
	}
}
