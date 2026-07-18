# Go

A demonstration of Go usage. Every demo prints "expression → result", so a single run shows you the real behavior of each language feature without memorizing docs.

Together with [`../TypeScript`](../TypeScript), [`../Python`](../Python), and [`../Rust`](../Rust) in the same directory, these are four implementations of **the same set of topics, one-to-one aligned**, making it easy to compare how these strongly typed languages differ.

## Run it

```bash
go run .                    # run all 15 demos
go run . generics memory    # run only the specified ones
go test ./...               # run the unit tests (see demos/mathx_test.go)
```

Requires Go ≥ 1.21 (uses the `slices` / `cmp` / `maps` generic standard library; this project declares 1.23). No third-party dependencies.

## Contents

| # | File | Name | Focus |
| --- | --- | --- | --- |
| 01 | `demos/types.go` | `types` | `var`/`:=`, basic types, zero values, no implicit conversion, `iota`, `rune`/`byte` |
| 02 | `demos/collections.go` | `collections` | array vs slice, `map`, comma-ok, `map[T]struct{}` as a set, the `slices` package |
| 03 | `demos/functions.go` | `functions` | multiple return values, variadic parameters, named returns, `defer`, closures, higher-order functions |
| 04 | `demos/controlflow.go` | `control-flow` | only `for`, `if` with initializer, `switch` auto-break, type switch |
| 05 | `demos/structs.go` | `structs` | structs, value/pointer receivers, implicit interfaces, embedding as a replacement for inheritance |
| 06 | `demos/generics.go` | `generics` | type parameters, `cmp.Ordered`, custom type sets, generic type `Stack[T]` |
| 07 | `demos/errors.go` | `errors` | `error` return values, `errors.Is`/`As`, `%w` wrapping, `panic`/`recover` |
| 08 | `demos/concurrency.go` | `concurrency` | goroutines, channels, `WaitGroup`, `select` + timeout, `Mutex` |
| 09 | `demos/advancedtypes.go` | `advanced-types` | defined types, `iota` + `Stringer` enums, type aliases, type assertions |
| 10 | `demos/reflection.go` | `reflection` | struct tags + `reflect` (Go's take on "annotations/metaprogramming"), a mini validator |
| 11 | `demos/memory.go` | `memory` | pointers `*T`/`&`, pass by value vs by pointer, `new`/`make`, escape analysis |
| 12 | `demos/stdlib.go` | `stdlib` | `encoding/json`, `time`, `strings`, `sort` |
| 13 | `demos/iterators.go` | `iterators` | **range-over-func (1.23)**, `iter.Seq`, lazy infinite sequences, `slices.Collect` |
| 14 | `demos/modules.go` + `internal/shapes/` | `modules` | a package as the unit of encapsulation, case controls export, `init()`, the `internal/` boundary |
| 15 | `demos/sortingequality.go` | `sorting` | `slices.SortFunc`, `cmp.Or` multi-key, stable sorting, struct `==` comparability / use as map keys |
| 16 | `demos/mathx_test.go` | — | the built-in `testing` package, table-driven tests (run with `go test ./...`) |

## Type-system highlights (Go's trade-offs)

- **Static strong typing + no implicit conversion**: adding an `int` and an `int64` still requires an explicit conversion. Verbose-seeming, but it rules out an entire class of subtle bugs.
- **Implicit interfaces (structural)**: a type satisfies an interface automatically as long as it has the required methods — no `implements` keyword. This matches TypeScript's structural typing and Python's `Protocol`.
- **Composition over inheritance**: Go has no inheritance; you reuse fields and methods via **embedding** (placing one type anonymously inside another struct) — see `05`.
- **Errors are values, not exceptions**: `if err != nil` is the most central idiom; `panic`/`recover` is reserved for truly unrecoverable situations (see `07`).
- **No decorators/annotations**: when you need "metaprogramming", use struct tags + reflection (see `10`) — JSON serialization, ORMs, and parameter validation are all built on this.

## Toolchain

| Purpose | Tool |
| --- | --- |
| Dependency management | `go mod` (`go.mod` / `go.sum`), `go get` to add dependencies |
| Build / run | `go build`, `go run .` |
| Testing | built-in `go test` (no third party needed) |
| Formatting | `gofmt` / `go fmt` (the single official style, no debate) |
| Static analysis | `go vet`; the community commonly adds `staticcheck` / `golangci-lint` |
