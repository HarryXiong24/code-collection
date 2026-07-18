"""03 Functions — default parameters, *args/**kwargs, keyword arguments, closures, type annotations.

Key points:
  1. Both parameters and return values can be annotated; Callable describes a "function type".
  2. *args collects positional arguments into a tuple, **kwargs collects keyword arguments into a dict.
  3. Before `/` are positional-only parameters, after `*` are keyword-only parameters.
  4. Default values are evaluated once "at definition time" — a mutable default is a classic trap (see 11).
  5. Functions are first-class objects: assignable, passable, returnable → higher-order functions and closures.
"""

from collections.abc import Callable

from .log import note, show, title


def add(a: int, b: int) -> int:
    return a + b


def greet(name: str, greeting: str = "Hi", *tags: str) -> str:
    """Default parameter + variadic positional arguments."""
    suffix = f" [{', '.join(tags)}]" if tags else ""
    return f"{greeting}, {name}{suffix}"


def make_user(*, name: str, age: int = 0) -> dict[str, object]:
    """Everything after `*` is "keyword-only"; callers must name the arguments."""
    return {"name": name, "age": age}


def multiplier(factor: int) -> Callable[[int], int]:
    """Higher-order function: returns a closure that remembers factor."""
    return lambda n: n * factor


def run() -> None:
    title("03 Functions")

    show("add(2, 3)", add(2, 3))

    note("default parameters / variadic positional arguments *args")
    show("greet('Harry')", greet("Harry"))
    show("greet('Harry', 'Hello')", greet("Harry", "Hello"))
    show("greet('Harry', 'Hey', 'vip', 'new')", greet("Harry", "Hey", "vip", "new"))

    note("keyword-only parameters: callers must name them, which reads better")
    show("make_user(name='Alice', age=30)", make_user(name="Alice", age=30))

    note("**kwargs collects arbitrary keyword arguments into a dict")

    def describe(**props: object) -> str:
        return ", ".join(f"{k}={v}" for k, v in props.items())

    show("describe(a=1, b=2)", describe(a=1, b=2))

    note("closure + lambda: triple remembers factor=3")
    triple = multiplier(3)
    show("triple(10)", triple(10))

    note("functions as arguments: built-in map/filter/sorted all take a function")
    show("sorted(words, key=len)", sorted(["banana", "fig", "apple"], key=len))
    show("list(map(str.upper, ...))", list(map(str.upper, ["a", "b"])))
