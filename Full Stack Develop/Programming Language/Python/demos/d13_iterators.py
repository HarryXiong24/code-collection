"""13 迭代器与生成器 —— 惰性产生序列，用多少算多少。

要点：
  1. 生成器函数用 yield 逐个吐值，调用返回一个惰性迭代器。
  2. 生成器表达式 (x for x in ...) 是惰性版的推导式。
  3. 惰性：值在被取时才算，可以表示无限序列，配 itertools.islice 截断。
  4. yield from 委托给另一个可迭代对象，做拼接/递归。
  5. 自定义迭代器实现 __iter__/__next__；for/展开/解构都基于迭代协议。
"""

import itertools
from collections.abc import Iterable, Iterator

from .log import note, show, title


def gen_range(start: int, end: int, step: int = 1) -> Iterator[int]:
    """生成器函数：像普通函数一样写，用 yield 吐值。"""
    i = start
    while i < end:
        yield i
        i += step


def fib() -> Iterator[int]:
    """无限序列：惰性，所以 while True 不会失控。"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def concat[T](*iterables: Iterable[T]) -> Iterator[T]:
    """yield from 委托：把多个可迭代对象拼成一个。"""
    for it in iterables:
        yield from it


class Countdown:
    """自定义可迭代对象：实现 __iter__ 就能被 for 消费。"""

    def __init__(self, start: int) -> None:
        self.start = start

    def __iter__(self) -> Iterator[int]:
        n = self.start
        while n > 0:
            yield n
            n -= 1


def run() -> None:
    title("13 迭代器与生成器")

    note("生成器函数：用 list() 或 for 消费")
    show("list(gen_range(0, 5))", list(gen_range(0, 5)))
    show("list(gen_range(0, 10, 2))", list(gen_range(0, 10, 2)))

    note("无限序列 + islice：惰性求值，只取前 10 个")
    show("islice(fib(), 10)", list(itertools.islice(fib(), 10)))

    note("生成器表达式：惰性版推导式，() 而非 []")
    squares = (n * n for n in fib())  # 不会立刻计算
    show("fib 平方前 5 个", list(itertools.islice(squares, 5)))

    note("yield from 委托：拼接多个可迭代对象")
    show("concat(range, 列表)", list(concat(gen_range(0, 3), [100, 200])))

    note("自定义可迭代对象：实现 __iter__")
    show("list(Countdown(5))", list(Countdown(5)))

    note("手动驱动：next() 逐个取，取尽抛 StopIteration")
    it = gen_range(0, 2)
    show("next(it)", next(it))
    show("next(it)", next(it))
    show("next(it, '结束')", next(it, "结束"))  # 带默认值避免异常
