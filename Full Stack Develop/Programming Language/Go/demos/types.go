package demos

import (
	"fmt"
	"strconv"

	"proglang/internal/logx"
)

// Types 演示类型与变量。
// 要点：
//  1. var 声明可带类型也可推断；:= 是「声明并推断」的简写（仅函数内可用）。
//  2. 基本类型：bool / string / int / int64 / float64 / rune / byte 等，界限清晰。
//  3. Go 不做隐式数值转换 —— int 和 int64 相加也要显式转。
//  4. 每种类型都有「零值」：数字 0、字符串 ""、bool false、指针 nil。
//  5. const 是编译期常量；iota 生成递增枚举值。
func Types() {
	logx.Title("01 类型与变量")

	logx.Note("var 显式声明；:= 声明并推断（只能在函数内）")
	var name string = "Harry"
	age := 30     // 推断为 int
	price := 9.99 // 推断为 float64
	isVip := true // 推断为 bool
	logx.Show("name / age / price / isVip", fmt.Sprintf("%s / %d / %.2f / %t", name, age, price, isVip))

	logx.Note("零值：未初始化的变量有确定的默认值，不是垃圾值")
	var (
		zeroInt int
		zeroStr string
		zeroBl  bool
	)
	logx.Show("零值 int / bool", fmt.Sprintf("%d / %t", zeroInt, zeroBl))
	logx.Show("零值 string == \"\"", zeroStr == "")

	logx.Note("没有隐式转换：不同数值类型运算前必须显式转")
	var i int = 7
	var f float64 = 2.0
	logx.Show("float64(i) / f", float64(i)/f)

	logx.Note("rune 是 int32（一个 Unicode 码点），byte 是 uint8")
	s := "Go语言"
	logx.Show("len(s) 字节数", len(s))            // 按字节
	logx.Show("[]rune(s) 字符数", len([]rune(s))) // 按字符
	for i, r := range "Aあ" {
		logx.Show(fmt.Sprintf("rune@%d", i), fmt.Sprintf("%c (U+%04X)", r, r))
	}

	logx.Note("const + iota：生成一组递增常量（枚举的基础）")
	const (
		Sunday  = iota // 0
		Monday         // 1
		Tuesday        // 2
	)
	logx.Show("iota Sunday/Monday/Tuesday", []int{Sunday, Monday, Tuesday})

	logx.Note("字符串 ↔ 数字用 strconv，不会隐式转换")
	n, _ := strconv.Atoi("42")
	logx.Show("strconv.Atoi(\"42\")", n)
	logx.Show("strconv.Itoa(7)", strconv.Itoa(7))
}
