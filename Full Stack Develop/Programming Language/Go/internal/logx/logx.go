// Package logx 是三个语言项目共用的极简打印工具的 Go 版：
// 每个 demo 都用它把「表达式 → 结果」对齐打印出来。
// 对应 TypeScript 的 src/log.ts、Python 的 demos/log.py。
package logx

import (
	"fmt"
	"strings"
)

const (
	reset = "\033[0m"
	dim   = "\033[2m"
	bold  = "\033[1m"
	cyan  = "\033[36m"
	green = "\033[32m"
	red   = "\033[31m"
)

// Title 打印一节的标题。
func Title(text string) {
	line := strings.Repeat("━", max(0, 40-len([]rune(text))))
	fmt.Printf("\n%s%s━━ %s %s%s\n", bold, cyan, text, line, reset)
}

// Note 打印一行讲解（灰色 # 注释）。
func Note(text string) {
	fmt.Printf("  %s# %s%s\n", dim, text, reset)
}

// Show 打印「表达式 → 结果」，对齐成 expr → value。
func Show(expr string, value any) {
	pad := 44 - len([]rune(expr))
	if pad < 1 {
		pad = 1
	}
	fmt.Printf("  %s%s%s%s%s→%s %s\n", green, expr, strings.Repeat(" ", pad), reset, dim, reset, format(value))
}

// Errorf 打印一条错误行。
func Errorf(text string) {
	fmt.Printf("  %s✗ %s%s\n", red, text, reset)
}

func format(v any) string {
	switch x := v.(type) {
	case nil:
		return "nil"
	case string:
		return fmt.Sprintf("%q", x)
	case error:
		return fmt.Sprintf("%q", x.Error())
	default:
		return fmt.Sprintf("%v", x)
	}
}
