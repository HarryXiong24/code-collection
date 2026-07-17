package demos

import (
	"fmt"

	"proglang/internal/logx"
)

// ControlFlow 演示控制流。
// 要点：
//  1. Go 只有一个循环关键字 for，能顶 while / 无限循环 / range 三种形态。
//  2. if 可带初始化语句：if v, ok := m[k]; ok { ... }。
//  3. switch 默认自动 break，不用写 break；想穿透用 fallthrough。
//  4. switch 可不带表达式，当作更清晰的 if-else 链。
//  5. range 遍历切片给 (下标, 值)，遍历 map 给 (键, 值)。
func ControlFlow() {
	logx.Title("04 控制流")

	logx.Note("if 带初始化语句：变量作用域仅限于该 if")
	m := map[string]int{"a": 1}
	if v, ok := m["a"]; ok {
		logx.Show("if init: m[\"a\"]", v)
	}

	logx.Note("for 的三种形态：计数 / 类 while / 无限（此处只跑计数与 while）")
	total := 0
	for i := 1; i <= 5; i++ {
		total += i
	}
	logx.Show("for 计数 1..5 求和", total)

	n := 3
	collected := []int{}
	for n > 0 { // 没有 while，for 单条件就是 while
		collected = append(collected, n)
		n--
	}
	logx.Show("for 当 while 用", collected)

	logx.Note("range：切片给 (下标,值)，map 给 (键,值)")
	for i, c := range []string{"x", "y", "z"} {
		logx.Show(fmt.Sprintf("idx %d", i), c)
	}

	logx.Note("switch 自动 break，不用手写；case 可以是多个值")
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

	logx.Note("类型 switch：对 any 按动态类型分派")
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
