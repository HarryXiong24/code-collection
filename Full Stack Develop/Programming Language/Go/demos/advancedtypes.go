package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// Status 是「defined type」：底层是 int，但和 int 是不同类型，需显式转换。
type Status int

const (
	StatusActive Status = iota // 0
	StatusPaused               // 1
	StatusClosed               // 2
)

// String 实现 fmt.Stringer，让枚举打印出名字而非数字 —— Go 的「枚举」惯用法。
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

// Celsius / Fahrenheit：defined type 让「单位」进入类型系统，防止混用。
type Celsius float64
type Fahrenheit float64

func (c Celsius) ToF() Fahrenheit { return Fahrenheit(c*9/5 + 32) }

// MyID 是「type alias」：完全等同于 int，只是换个名字（注意 = 号）。
type MyID = int

// AdvancedTypes 演示高级类型。
// 要点：
//  1. defined type（type X int）创造新类型，配 iota + String() 就是枚举。
//  2. type alias（type X = int）只是别名，和原类型完全互换。
//  3. 用 defined type 给「单位/ID」加类型安全，防止参数传错。
//  4. any（= interface{}）+ 类型断言 v, ok := x.(T) 在运行时取回具体类型。
func AdvancedTypes() {
	logx.Title("09 高级类型")

	logx.Note("iota 枚举 + Stringer：打印出名字，可正查反查")
	logx.Show("StatusActive", StatusActive)           // 走 String()
	logx.Show("int(StatusClosed)", int(StatusClosed)) // 底层值
	logx.Show("所有状态", []Status{StatusActive, StatusPaused, StatusClosed})

	logx.Note("defined type 让单位进类型系统：Celsius 不会被误当普通 float64")
	body := Celsius(37)
	logx.Show("37°C → °F", body.ToF())

	logx.Note("type alias：MyID 就是 int，可直接互换")
	var id MyID = 42
	logx.Show("MyID + int", id+8)

	logx.Note("类型断言：从 any 里安全取回具体类型")
	var x any = "hello"
	if s, ok := x.(string); ok {
		logx.Show("x.(string)", s)
	}
	if _, ok := x.(int); !ok {
		logx.Show("x.(int) 失败", "ok=false，不会 panic")
	}
}
