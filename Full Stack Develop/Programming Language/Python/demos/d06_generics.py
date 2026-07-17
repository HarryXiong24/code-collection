"""06 泛型 —— Python 3.12+ 的新泛型语法（PEP 695）。

要点：
  1. 新语法：函数 def f[T](...)、类 class Stack[T]、类型别名 type Alias[T] = ...。
  2. 约束用「有界类型参数」T: SupportsX，或 Protocol 描述能力。
  3. 泛型只影响静态检查，运行时被擦除（和 TypeScript 一样）。
  4. 老代码里可能见到 typing.TypeVar / Generic，等价但更啰嗦。
"""

from collections.abc import Callable, Iterable
from typing import Protocol

from .log import note, show, title


def first[T](xs: list[T]) -> T | None:
    """泛型函数（PEP 695）：进 list[T]，出 T 或 None。"""
    return xs[0] if xs else None


def map_list[T, R](xs: Iterable[T], fn: Callable[[T], R]) -> list[R]:
    """两个类型参数：把 T 序列变换成 R 列表。"""
    return [fn(x) for x in xs]


class Comparable(Protocol):
    def __lt__(self, other: object, /) -> bool: ...


def maximum[T: Comparable](xs: list[T]) -> T:
    """有界类型参数 T: Comparable —— 只接受支持 < 的类型。"""
    best = xs[0]
    for x in xs[1:]:
        if best < x:
            best = x
    return best


class Stack[T]:
    """泛型类：一个类型安全的栈。"""

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T | None:
        return self._items.pop() if self._items else None

    @property
    def size(self) -> int:
        return len(self._items)


def run() -> None:
    title("06 泛型")

    note("泛型函数：类型随实参推断")
    show("first([1, 2, 3])", first([1, 2, 3]))
    show("first([])", first([]))
    show("map_list([1,2,3], str)", map_list([1, 2, 3], str))

    note("有界类型参数：数字、字符串都支持 < 比较")
    show("maximum([3, 9, 5])", maximum([3, 9, 5]))
    show("maximum(['abc', 'abd'])", maximum(["abc", "abd"]))

    note("泛型类 Stack[int]：静态检查器保证只放 int")
    st: Stack[int] = Stack()
    st.push(1)
    st.push(2)
    show("stack.pop()", st.pop())
    show("stack.size", st.size)
