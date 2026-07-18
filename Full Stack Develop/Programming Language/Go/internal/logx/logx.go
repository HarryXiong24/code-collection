// Package logx is the Go version of the minimal printing helper shared across the
// language projects: every demo uses it to print "expression → result" aligned.
// It corresponds to TypeScript's src/log.ts and Python's demos/log.py.
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

// Title prints a section heading.
func Title(text string) {
	line := strings.Repeat("━", max(0, 40-len([]rune(text))))
	fmt.Printf("\n%s%s━━ %s %s%s\n", bold, cyan, text, line, reset)
}

// Note prints an explanatory line (a dimmed # comment).
func Note(text string) {
	fmt.Printf("  %s# %s%s\n", dim, text, reset)
}

// Show prints "expression → result", aligned as expr → value.
func Show(expr string, value any) {
	pad := 44 - len([]rune(expr))
	if pad < 1 {
		pad = 1
	}
	fmt.Printf("  %s%s%s%s%s→%s %s\n", green, expr, strings.Repeat(" ", pad), reset, dim, reset, format(value))
}

// Errorf prints an error line.
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
