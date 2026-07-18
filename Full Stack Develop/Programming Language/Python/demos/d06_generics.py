"""06 Generics — Python 3.12+'s new generic syntax (PEP 695).

Key points:
  1. New syntax: functions def f[T](...), classes class Stack[T], type aliases type Alias[T] = ...
  2. Constrain with "bounded type parameters" T: SupportsX, or a Protocol describing a capability.
  3. Generics affect only static checking and are erased at runtime (just like TypeScript).
  4. Older code may show typing.TypeVar / Generic — equivalent but more verbose.
"""

from collections.abc import Callable, Iterable
from typing import Protocol

from .log import note, show, title


def first[T](xs: list[T]) -> T | None:
    """Generic function (PEP 695): takes list[T], returns T or None."""
    return xs[0] if xs else None


def map_list[T, R](xs: Iterable[T], fn: Callable[[T], R]) -> list[R]:
    """Two type parameters: transform a sequence of T into a list of R."""
    return [fn(x) for x in xs]


class Comparable(Protocol):
    def __lt__(self, other: object, /) -> bool: ...


def maximum[T: Comparable](xs: list[T]) -> T:
    """Bounded type parameter T: Comparable — accepts only types that support <."""
    best = xs[0]
    for x in xs[1:]:
        if best < x:
            best = x
    return best


class Stack[T]:
    """Generic class: a type-safe stack."""

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
    title("06 Generics")

    note("generic function: the type is inferred from the argument")
    show("first([1, 2, 3])", first([1, 2, 3]))
    show("first([])", first([]))
    show("map_list([1,2,3], str)", map_list([1, 2, 3], str))

    note("bounded type parameter: numbers and strings both support < comparison")
    show("maximum([3, 9, 5])", maximum([3, 9, 5]))
    show("maximum(['abc', 'abd'])", maximum(["abc", "abd"]))

    note("generic class Stack[int]: the static checker guarantees only int goes in")
    st: Stack[int] = Stack()
    st.push(1)
    st.push(2)
    show("stack.pop()", st.pop())
    show("stack.size", st.size)
