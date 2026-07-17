"""10 装饰器 —— Python 最有代表性的元编程特性。

要点：
  1. 装饰器就是「接收函数、返回新函数」的高阶函数，用 @deco 语法糖套上。
  2. functools.wraps 保留被装饰函数的名字/文档，写装饰器几乎必带。
  3. 带参数的装饰器 = 再套一层（返回装饰器的工厂函数）。
  4. 标准库自带实用装饰器：@lru_cache（记忆化）、@property、@dataclass。
  5. 对应 TS 的 @decorator、Go 的 struct tag + 反射 —— 横向对照看。
"""

import functools
import time
from collections.abc import Callable

from .log import note, show, title

_call_log: list[str] = []


def logged[**P, R](fn: Callable[P, R]) -> Callable[P, R]:
    """方法/函数装饰器：调用前后记录（用 ParamSpec 保留原签名）。"""

    @functools.wraps(fn)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        result = fn(*args, **kwargs)
        _call_log.append(f"{fn.__name__}{args} → {result}")
        return result

    return wrapper


def repeat(times: int) -> Callable[[Callable[..., str]], Callable[..., str]]:
    """带参数的装饰器：把返回值重复 times 次。"""

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
    """@lru_cache 自动记忆化，递归 fib 不再重复计算。"""
    return n if n < 2 else fib(n - 1) + fib(n - 2)


def run() -> None:
    title("10 装饰器")

    note("@logged：调用被自动记录，业务函数里没有日志代码")
    show("add(2, 3)", add(2, 3))
    show("add(10, 20)", add(10, 20))
    show("被记录的调用", _call_log)
    show("wraps 保留了函数名", add.__name__)

    note("带参数的装饰器 @repeat(3)")
    show("cheer('py')", cheer("py"))

    note("@lru_cache：记忆化，第 35 项瞬间算完")
    t = time.perf_counter()
    result = fib(35)
    show("fib(35)", result)
    show("耗时(ms)", round((time.perf_counter() - t) * 1000, 3))
    show("cache 命中信息", str(fib.cache_info()))
