# Programming Language: TypeScript · Go · Python · Rust Side-by-Side

Four **independently runnable** teaching projects that demonstrate TypeScript, Go, Python, and Rust using **the same 15 topics + 1 testing topic**. Every demo prints "expression → result", so a single run shows you the real behavior of each language feature.

The four implementations deliberately keep the **topics one-to-one and the examples point-by-point aligned**, putting the same concept side by side across four languages so the differences jump out. All four are **strongly typed** languages, but their typing strategies differ: TS/Python use "static type annotations + compile-time/tooling checks", Go is "compile-time enforced, no implicit conversions", and Rust goes further, folding memory safety into the type system via "ownership + borrowing".

```
Programming Language/
├── TypeScript/   npm run dev        (TS 5 + Node, compiled with tsc then run)
├── Go/           go run .           (Go 1.23, no third-party dependencies)
├── Python/       python main.py     (Python 3.12+, no third-party dependencies)
├── Rust/         cargo run          (Rust 2021, no third-party dependencies)
└── README.md     ← you are here
```

## Run it in one minute

| Language | Run all | Run only some | Test |
| --- | --- | --- | --- |
| TypeScript | `cd TypeScript && npm install && npm run dev` | `npm start generics async` | `npm test` |
| Go | `cd Go && go run .` | `go run . generics memory` | `go test ./...` |
| Python | `cd Python && python main.py` | `python main.py generics async` | `python -m unittest` |
| Rust | `cd Rust && cargo run` | `cargo run -- generics sorting` | `cargo test` |

## Topic cross-reference

> The filename column lists each language's corresponding demo; Rust's files all live under `Rust/src/demos/`.

| # | Topic | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- | --- |
| 01 | Types & variables | `01-types.ts` | `types.go` | `d01_types.py` | `d01_types.rs` |
| 02 | Collection types | `02-collections.ts` | `collections.go` | `d02_collections.py` | `d02_collections.rs` |
| 03 | Functions | `03-functions.ts` | `functions.go` | `d03_functions.py` | `d03_functions.rs` |
| 04 | Control flow | `04-control-flow.ts` | `controlflow.go` | `d04_control_flow.py` | `d04_control_flow.rs` |
| 05 | Structs · classes · interfaces | `05-structs-classes-interfaces.ts` | `structs.go` | `d05_classes.py` | `d05_structs_traits.rs` |
| 06 | Generics | `06-generics.ts` | `generics.go` | `d06_generics.py` | `d06_generics.rs` |
| 07 | Error handling | `07-error-handling.ts` | `errors.go` | `d07_errors.py` | `d07_errors.rs` |
| 08 | Concurrency & async | `08-async.ts` | `concurrency.go` | `d08_async.py` | `d08_concurrency.rs` |
| 09 | Advanced types | `09-advanced-types.ts` | `advancedtypes.go` | `d09_advanced_types.py` | `d09_advanced_types.rs` |
| 10 | Decorators · metaprogramming | `10-decorators.ts` | `reflection.go` | `d10_decorators.py` | `d10_macros.rs` |
| 11 | Memory · references · pointers | `11-memory-references.ts` | `memory.go` | `d11_memory.py` | `d11_ownership.rs` |
| 12 | Standard library idioms | `12-stdlib.ts` | `stdlib.go` | `d12_stdlib.py` | `d12_stdlib.rs` |
| 13 | Iterators & generators | `13-iterators.ts` | `iterators.go` | `d13_iterators.py` | `d13_iterators.rs` |
| 14 | Modules · packages · visibility | `14-modules.ts` | `modules.go` + `internal/shapes/` | `d14_modules.py` + `mathlib.py` | `d14_modules.rs` |
| 15 | Custom sorting & equality | `15-sorting-equality.ts` | `sortingequality.go` | `d15_sorting_equality.py` | `d15_sorting_equality.rs` |
| 16 | Testing | `tests/demo.test.ts` | `demos/mathx_test.go` | `tests/test_demos.py` | `src/mathx.rs` |

## Language feature quick reference: one task, four ways

### Variable & type declaration

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Declare + infer | `const x = 42` | `x := 42` | `x = 42` | `let x = 42` |
| Explicit annotation | `const x: number = 42` | `var x int = 42` | `x: int = 42` | `let x: i32 = 42` |
| Mutability | `let` mutable / `const` immutable | mutable by default | mutable by default | **immutable by default**, `let mut` for mutable |
| Type strength | static, erased at compile time | static, enforced at compile time | dynamic, annotations checked by tooling | static, enforced at compile time |
| Implicit numeric conversion | yes (all `number`) | **none**, must convert explicitly | yes (`int`/`float` automatic) | **none**, use `as` to convert explicitly |
| Integer upper bound | precision limit, use `bigint` for large numbers | fixed width `int`/`int64` | **arbitrary precision** | fixed width, overflow via `checked_`/`wrapping_` |

### Functions

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Multiple return values | use a tuple `[a, b]` | **native** `(int, int)` | use a tuple `a, b` | use a tuple `(a, b)` |
| Variadic parameters | `...args: T[]` | `args ...T` | `*args: T` | none (use a slice/`Vec`) |
| Default values | `x = 1` | none (check it yourself) | `x=1` / `**kwargs` | none (use `Option`) |
| Function type | `(n: number) => number` | `func(int) int` | `Callable[[int], int]` | `impl Fn(i32) -> i32` |

### Data structures & polymorphism

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Data container | `interface` / `class` | `struct` | `@dataclass` / `class` | `struct` + `impl` |
| Interface/protocol | `interface` (structural) | `interface` (implicit implementation) | `Protocol` (structural) | `trait` (explicit `impl`) |
| Type compatibility | **structural** (by shape) | **structural** (by method set) | **structural** (duck typing) | **nominal** (must explicitly implement the trait) |
| Code reuse | inheritance `extends` + composition | **composition only** (embedding) | inheritance + `super()` | **composition + traits only** |

On polymorphism TS/Go/Python all lean **structural** (matching the shape means compatible); Rust is **nominal** (you must explicitly `impl Trait for T`), but it likewise has **no class inheritance**, relying on composition + traits.

### Generics

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Functions | `function f<T>(x: T)` | `func F[T any](x T)` | `def f[T](x: T)` (3.12+) | `fn f<T>(x: T)` |
| Types | `class Stack<T>` | `type Stack[T any]` | `class Stack[T]` | `struct Stack<T>` |
| Constraints | `<T extends X>` | `[T cmp.Ordered]` / type set | `[T: Comparable]` | `<T: Trait>` / `where` |
| Implementation | erased at compile time | dictionary passing | erased at runtime | **monomorphization** (zero cost) |

### Error handling — four philosophies

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Mechanism | `throw` / `try-catch` | **errors as return values** `if err != nil` | `raise` / `try-except` | **`Result<T,E>` + `?`** |
| Nullability | `null` / `undefined` | zero value / `nil` | `None` | **`Option<T>` (no null)** |
| Unrecoverable | `throw` | `panic` / `recover` | uncaught exception | `panic!` |
| Idiomatic style | exceptions, or a `Result`-like union | explicitly check every `error` | EAFP: try first, handle on failure | type-enforced handling, propagate with `?` |

### Concurrency model

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Model | single-threaded + event loop | **goroutine + channel** | `asyncio` coroutines (bounded by the GIL) | **OS threads + channel** |
| Launch | `async/await` + `Promise` | `go f()` | `async/await` + `asyncio` | `thread::spawn` |
| Concurrent wait | `Promise.all` | `sync.WaitGroup` | `asyncio.gather` / `TaskGroup` | `handle.join()` |
| Shared state | no sharing (single-threaded) | `Mutex` / channel | needs `Lock` under the GIL | `Arc<Mutex<T>>`, **races caught at compile time** |

### Metaprogramming (four routes for topic 10)

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Means | TC39 **decorators** `@deco` | **struct tag + reflection** | **decorators** `@deco` | **macros** `macro_rules!` + `#[derive]` |
| Timing | runtime wrapping | runtime reflection | runtime wrapping | **compile-time expansion** (type-safe) |
| Typical uses | logging, caching, DI, routing | JSON serialization, ORM, validation | logging, caching, `@lru_cache` | eliminating boilerplate, `#[derive(Debug)]` |

### Memory & ownership (topic 11)

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Memory management | GC | GC | GC (reference counting + cycle collection) | **ownership + RAII, no GC** |
| Primitive values | by value | by value | immutable objects "rebound" | by value (`Copy`) |
| Objects/containers | by reference | structs by value, slice/map by reference | everything by reference | **move (ownership transfer)** |
| Explicit pointers/references | none | `*T` / `&` (no pointer arithmetic) | none | `&T` / `&mut T` (borrow checker) |
| Deep copy | `structuredClone()` | hand-written / serialization | `copy.deepcopy()` | `.clone()` |

### Iterators & generators (topic 13)

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Generator/iterator | `function*` + `yield` | `func(yield func(T) bool)` | `def` + `yield` | `impl Iterator` + `next()` |
| Iteration protocol | `[Symbol.iterator]()` | **range-over-func (1.23)** | `__iter__` / `__next__` | `Iterator` trait |
| Lazy infinite sequences | ✅ lazy | ✅ lazy | ✅ lazy | ✅ lazy (`(1..).take(n)`) |
| Delegation/concatenation | `yield*` | manual `for range` forwarding | `yield from` | `.chain(...)` |
| Materialize into a list | `[...gen]` | `slices.Collect(seq)` | `list(gen)` | `.collect()` |

### Modules · packages · visibility (topic 14)

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Unit | one file = one module | one directory = one **package** | one file = a module, a directory = a package | `mod` (file or inline), crate |
| Default visibility | private (needs `export`) | private (needs capitalization) | **public** | **private** (needs `pub`) |
| Export | `export` / `export default` | **capitalized initial letter** | `__all__` constrains `import *` | `pub` |
| Import | `import` | `import` | `import` | `use` |
| Init hook | module top-level code | `init()` function | module top-level code | none (use `once`/lazy statics) |

### Custom sorting & equality (topic 15)

| | TypeScript | Go | Python | Rust |
| --- | --- | --- | --- | --- |
| Sort argument | comparator `(a,b)=>number` | comparator `cmp func → int` | **key function** `key=` | `sort_by_key` / `sort_by` |
| Multiple keys | chained comparators `a() \|\| b()` | `cmp.Or(...)` (1.22+) | tuple key `(k1, -k2)` | `Ordering::then(...)` |
| Stability | `sort` is stable (ES2019+) | needs `SortStableFunc` | `sorted` is stable | `sort` is stable / `sort_unstable` |
| Value equality | no overloading, `===` compares references | struct `==` compares field by field | `__eq__` (`dataclass` automatic) | `#[derive(PartialEq)]` |
| Usable as key/hash | reference identity, build your own key | comparable structs work directly as map keys | `__hash__` (`frozen` automatic) | `#[derive(Eq, Hash)]` |
| Custom ordering | hand-written comparator | hand-written `cmp` function | `@total_ordering` fills in the rest | `impl Ord` |

## How to use these four projects

1. **Pick a topic** (generics, say), open the four files side by side, and read the comments in parallel.
2. **Run each one**, and compare the actual "expression → result" output in the terminal.
3. **Change a line and rerun**, and watch how the type checker/compiler/runtime each react — this is the fastest way to feel the "type strength" differences. Comparing Rust's ownership/borrow errors against the other three languages especially conveys the design trade-offs.

Each subdirectory's `README.md` has more detailed notes for that language, its type-system highlights, and a toolchain comparison.
