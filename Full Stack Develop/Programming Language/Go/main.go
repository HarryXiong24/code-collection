// Command proglang 跑一组演示 Go 语言用法的 demo。
//
//	go run .                 跑全部
//	go run . generics memory 只跑指定的几个
//	go test ./...            跑单元测试（见 demos/mathx_test.go）
package main

import (
	"os"

	"proglang/demos"
	"proglang/internal/logx"
)

func main() {
	// demo 名 → 函数，顺序与 TypeScript / Python 项目一一对应。
	registry := []struct {
		name string
		fn   func()
	}{
		{"types", demos.Types},
		{"collections", demos.Collections},
		{"functions", demos.Functions},
		{"control-flow", demos.ControlFlow},
		{"structs", demos.Structs},
		{"generics", demos.Generics},
		{"errors", demos.Errors},
		{"concurrency", demos.Concurrency},
		{"advanced-types", demos.AdvancedTypes},
		{"reflection", demos.Reflection},
		{"memory", demos.Memory},
		{"stdlib", demos.Stdlib},
		{"iterators", demos.Iterators},
		{"modules", demos.Modules},
		{"sorting", demos.SortingEquality},
	}

	logx.Title("Go 语言用法演示")

	args := os.Args[1:]
	want := map[string]bool{}
	for _, a := range args {
		want[a] = true
	}

	for _, d := range registry {
		if len(args) == 0 || want[d.name] {
			d.fn()
		}
	}
}
