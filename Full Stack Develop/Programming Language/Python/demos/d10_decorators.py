"""10 Decorators — Python's most representative metaprogramming feature.

Key points:
  1. A decorator is a higher-order function that "takes a function and returns a new function", applied with the @deco syntax sugar.
  2. functools.wraps preserves the decorated function's name/doc; writing a decorator almost always needs it.
  3. A parameterized decorator = one more layer (a factory function that returns the decorator).
  4. The standard library ships useful decorators: @lru_cache (memoization), @property, @dataclass.
  5. Corresponds to TS's @decorator and Go's struct tag + reflection — read them side by side.
"""

import functools
import time
from collections.abc import Callable

from .log import note, show, title

_call_log: list[str] = []


def logged[**P, R](fn: Callable[P, R]) -> Callable[P, R]:
    """Method/function decorator: log before and after the call (ParamSpec preserves the original signature)."""

    @functools.wraps(fn)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        result = fn(*args, **kwargs)
        _call_log.append(f"{fn.__name__}{args} → {result}")
        return result

    return wrapper


def repeat(times: int) -> Callable[[Callable[..., str]], Callable[..., str]]:
    """Parameterized decorator: repeat the return value times times."""

    def decorator(fn: Callable[..., str]) -> Callable[..., str]:
        @functools.wraps(fn)
        def wrapper(*args: object, **kwargs: object) -> str:
            return " ".join(fn(*args, **kwargs) for _ in range(times))

        return wrapper

    return decorator


@logged
def add(a: int, b: int) -> int:
    return a + b


@repeat(3)
def cheer(name: str) -> str:
    return f"go-{name}"


@functools.lru_cache(maxsize=None)
def fib(n: int) -> int:
    """@lru_cache memoizes automatically, so recursive fib no longer recomputes."""
    return n if n < 2 else fib(n - 1) + fib(n - 2)


def run() -> None:
    title("10 Decorators")

    note("@logged: calls are recorded automatically, with no logging code in the business function")
    show("add(2, 3)", add(2, 3))
    show("add(10, 20)", add(10, 20))
    show("recorded calls", _call_log)
    show("wraps preserved the function name", add.__name__)

    note("parameterized decorator @repeat(3)")
    show("cheer('py')", cheer("py"))

    note("@lru_cache: memoization, the 35th term computes instantly")
    t = time.perf_counter()
    result = fib(35)
    show("fib(35)", result)
    show("time (ms)", round((time.perf_counter() - t) * 1000, 3))
    show("cache hit info", str(fib.cache_info()))
