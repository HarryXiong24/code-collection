// Command proglang runs a set of demos showcasing Go language usage.
//
//	go run .                 run everything
//	go run . generics memory run only the specified ones
//	go test ./...            run the unit tests (see demos/mathx_test.go)
package main

import (
	"os"

	"proglang/demos"
	"proglang/internal/logx"
)

func main() {
	// demo name → function; the order corresponds one-to-one to the TypeScript / Python projects.
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

	logx.Title("Go language usage demos")

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
