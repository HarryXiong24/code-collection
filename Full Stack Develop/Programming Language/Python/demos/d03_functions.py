"""03 函数 —— 默认参数、*args/**kwargs、关键字参数、闭包、类型注解。

要点：
  1. 参数和返回值都能加类型注解；Callable 描述「函数类型」。
  2. *args 收集位置参数为 tuple，**kwargs 收集关键字参数为 dict。
  3. `/` 之前是仅位置参数，`*` 之后是仅关键字参数。
  4. 默认值在「定义时」求值一次 —— 可变默认值是经典大坑（见 11）。
  5. 函数是一等对象：可赋值、传参、返回 → 高阶函数与闭包。
"""

from collections.abc import Callable

from .log import note, show, title


def add(a: int, b: int) -> int:
    return a + b


def greet(name: str, greeting: str = "Hi", *tags: str) -> str:
    """默认参数 + 可变位置参数。"""
    suffix = f" [{', '.join(tags)}]" if tags else ""
    return f"{greeting}, {name}{suffix}"


def make_user(*, name: str, age: int = 0) -> dict[str, object]:
    """`*` 之后全是「仅关键字」参数，调用时必须写参数名。"""
    return {"name": name, "age": age}


def multiplier(factor: int) -> Callable[[int], int]:
    """高阶函数：返回一个记住了 factor 的闭包。"""
    return lambda n: n * factor


def run() -> None:
    title("03 函数")

    show("add(2, 3)", add(2, 3))

    note("默认参数 / 可变位置参数 *args")
    show("greet('Harry')", greet("Harry"))
    show("greet('Harry', 'Hello')", greet("Harry", "Hello"))
    show("greet('Harry', 'Hey', 'vip', 'new')", greet("Harry", "Hey", "vip", "new"))

    note("仅关键字参数：调用必须写名字，可读性更好")
    show("make_user(name='Alice', age=30)", make_user(name="Alice", age=30))

    note("**kwargs 收集任意关键字参数为 dict")

    def describe(**props: object) -> str:
        return ", ".join(f"{k}={v}" for k, v in props.items())

    show("describe(a=1, b=2)", describe(a=1, b=2))

    note("闭包 + lambda：triple 记住了 factor=3")
    triple = multiplier(3)
    show("triple(10)", triple(10))

    note("函数作参数：内置 map/filter/sorted 都接收函数")
    show("sorted(words, key=len)", sorted(["banana", "fig", "apple"], key=len))
    show("list(map(str.upper, ...))", list(map(str.upper, ["a", "b"])))
