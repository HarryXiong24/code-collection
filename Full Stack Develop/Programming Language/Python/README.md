# Python

A demonstration of Python usage (Python 3.12+). Every demo prints "expression → result", so a single run shows you the real behavior of each language feature without memorizing docs.

Together with [`../TypeScript`](../TypeScript), [`../Go`](../Go), and [`../Rust`](../Rust) in the same directory, these are four implementations of **the same set of topics, one-to-one aligned**, making it easy to compare how these strongly typed languages differ.

## Run it

```bash
python main.py                  # run all 15 demos
python main.py generics async   # run only the specified ones
python -m unittest              # run the unit tests (see tests/test_demos.py)
```

Requires Python ≥ 3.12 (uses PEP 695 generic syntax `def f[T]`, the `type` statement, and `@override`). No third-party dependencies.

> Everything here is **Python 3**. In this project every `print` is a function, `/` is true division, and strings are Unicode by default — no Python 2 idioms anywhere.

## Contents

| # | File | Name | Focus |
| --- | --- | --- | --- |
| 01 | `demos/d01_types.py` | `types` | dynamic typing + type annotations, arbitrary-precision `int`, `None`, conversions, f-strings |
| 02 | `demos/d02_collections.py` | `collections` | `list`/`tuple`/`dict`/`set`, comprehensions, slicing, unpacking |
| 03 | `demos/d03_functions.py` | `functions` | default parameters, `*args`/`**kwargs`, keyword-only parameters, closures, `Callable` |
| 04 | `demos/d04_control_flow.py` | `control-flow` | `for-else`, `enumerate`/`zip`, `match` structural pattern matching, truthiness |
| 05 | `demos/d05_classes.py` | `classes` | `@dataclass`, `@property`, inheritance, `Protocol` structural subtyping, `@override` |
| 06 | `demos/d06_generics.py` | `generics` | PEP 695 generics `def f[T]` / `class Stack[T]`, bounded type parameters |
| 07 | `demos/d07_errors.py` | `errors` | `try/except/else/finally`, custom exceptions, `raise from`, `with` |
| 08 | `demos/d08_async.py` | `async` | `asyncio`, `gather`, `TaskGroup`, `wait_for` timeout |
| 09 | `demos/d09_advanced_types.py` | `advanced-types` | `Literal`, `Enum`, `TypedDict`, `type` aliases, `isinstance` narrowing |
| 10 | `demos/d10_decorators.py` | `decorators` | decorators, `functools.wraps`, parameterized decorators, `@lru_cache` |
| 11 | `demos/d11_memory.py` | `memory` | reference semantics, mutable/immutable, `is` vs `==`, the mutable-default-argument trap, `deepcopy` |
| 12 | `demos/d12_stdlib.py` | `stdlib` | `json`, `datetime`, `pathlib`, `collections`, `itertools` |
| 13 | `demos/d13_iterators.py` | `iterators` | generators `yield`, generator expressions, lazy infinite sequences, `__iter__`, `yield from` |
| 14 | `demos/d14_modules.py` + `mathlib.py` | `modules` | the various `import` forms, `__all__`, the underscore convention, `__name__` / `__main__` |
| 15 | `demos/d15_sorting_equality.py` | `sorting` | `key=` multi-key sorting, stability, `frozen dataclass` equality/hashing, `@total_ordering` |
| 16 | `tests/test_demos.py` | — | the built-in `unittest`, `subTest` table-driven (run with `python -m unittest`) |

## Type-system highlights (Python's trade-offs)

- **Dynamic typing + gradual type annotations**: annotations are **not enforced at runtime**, backed instead by static checkers like `mypy` / `pyright`. This resembles TypeScript's "compile-time erasure", but Python doesn't even have a compile step — annotations are purely for tooling and readers.
- **`Protocol` = structural subtyping**: having the matching methods counts as implementing it, no explicit inheritance needed (see `05`). This corresponds to Go's implicit interfaces and TS's structural `interface`.
- **Everything is an object, variables are references**: understanding "mutable vs immutable" and the difference between `is`/`==` is the key to avoiding an entire class of bugs (see `11`).
- **PEP 695 new generic syntax (3.12+)**: `def first[T](xs: list[T]) -> T | None` writes the type parameter inline, no more `TypeVar` (see `06`).

## Toolchain

| Purpose | Tool |
| --- | --- |
| Versions / virtual environments | `python -m venv .venv`, or `uv` / `pyenv` |
| Dependency management | `pip` + `pyproject.toml`, modern alternatives `uv` / `poetry` |
| Type checking | `mypy` / `pyright` (config in `pyproject.toml`'s `[tool.mypy]`) |
| Testing | built-in `unittest` (this project), or `pytest` |
| Lint / formatting | `ruff` (one tool handles lint + format) |
