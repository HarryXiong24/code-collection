"""13 Iterators & generators — lazily produce sequences, computing only as much as you use.

Key points:
  1. A generator function uses yield to emit values one at a time; calling it returns a lazy iterator.
  2. A generator expression (x for x in ...) is the lazy version of a comprehension.
  3. Lazy: values are computed when pulled, so it can represent infinite sequences, truncated with itertools.islice.
  4. yield from delegates to another iterable, for concatenation/recursion.
  5. A custom iterator implements __iter__/__next__; for/spread/destructuring are all built on the iteration protocol.
"""

import itertools
from collections.abc import Iterable, Iterator

from .log import note, show, title


def gen_range(start: int, end: int, step: int = 1) -> Iterator[int]:
    """Generator function: written like an ordinary function, emitting values with yield."""
    i = start
    while i < end:
        yield i
        i += step


def fib() -> Iterator[int]:
    """Infinite sequence: lazy, so while True won't run away."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def concat[T](*iterables: Iterable[T]) -> Iterator[T]:
    """yield from delegation: splice multiple iterables into one."""
    for it in iterables:
        yield from it


class Countdown:
    """Custom iterable: implementing __iter__ makes it consumable by for."""

    def __init__(self, start: int) -> None:
        self.start = start

    def __iter__(self) -> Iterator[int]:
        n = self.start
        while n > 0:
            yield n
            n -= 1


def run() -> None:
    title("13 Iterators & generators")

    note("generator function: consume with list() or for")
    show("list(gen_range(0, 5))", list(gen_range(0, 5)))
    show("list(gen_range(0, 10, 2))", list(gen_range(0, 10, 2)))

    note("infinite sequence + islice: lazy evaluation, take only the first 10")
    show("islice(fib(), 10)", list(itertools.islice(fib(), 10)))

    note("generator expression: the lazy version of a comprehension, () not []")
    squares = (n * n for n in fib())  # not computed immediately
    show("first 5 fib squares", list(itertools.islice(squares, 5)))

    note("yield from delegation: splice multiple iterables")
    show("concat(range, list)", list(concat(gen_range(0, 3), [100, 200])))

    note("custom iterable: implement __iter__")
    show("list(Countdown(5))", list(Countdown(5)))

    note("manual driving: next() pulls one at a time, raises StopIteration when exhausted")
    it = gen_range(0, 2)
    show("next(it)", next(it))
    show("next(it)", next(it))
    show("next(it, 'end')", next(it, "end"))  # a default avoids the exception
