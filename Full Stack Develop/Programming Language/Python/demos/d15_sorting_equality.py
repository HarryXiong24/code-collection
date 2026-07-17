"""15 自定义排序与相等性 —— 按自己的规则排序，定义自己类型的「相等」与「大小」。

要点：
  1. sorted(key=...) / list.sort(key=...) 传「取键函数」，比传比较器更直观。
  2. 多键排序：key 返回元组 (主键, 次键)；降序用 reverse=True 或对数字取负。
  3. sorted 是稳定排序：键相等的元素保持原始顺序。
  4. @dataclass(frozen=True) 自动生成 __eq__ 和 __hash__ → 按值判等、可放进 set/dict。
  5. @total_ordering 只需写 __eq__ + __lt__，自动补全 <=、>、>= 等全部比较。
"""

import operator
from dataclasses import dataclass
from functools import total_ordering

from .log import note, show, title


@dataclass(frozen=True)
class Person:
    """frozen=True → 不可变、自动 __eq__/__hash__，可作 set/dict 元素。"""

    name: str
    dept: str
    age: int


@total_ordering
class Version:
    """@total_ordering：只写 __eq__ 和 __lt__，其余比较运算自动补齐。"""

    def __init__(self, major: int, minor: int) -> None:
        self.major = major
        self.minor = minor

    def _key(self) -> tuple[int, int]:
        return (self.major, self.minor)

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Version) and self._key() == other._key()

    def __lt__(self, other: "Version") -> bool:
        return self._key() < other._key()

    def __hash__(self) -> int:
        return hash(self._key())

    def __repr__(self) -> str:
        return f"{self.major}.{self.minor}"


def run() -> None:
    title("15 自定义排序与相等性")

    people = [
        Person("Alice", "eng", 30),
        Person("Bob", "sales", 25),
        Person("Carol", "eng", 25),
        Person("Dave", "sales", 40),
    ]
    names = lambda ps: [p.name for p in ps]  # noqa: E731

    note("单键排序：key= 取排序依据（不改原列表）")
    show("按 age 升序", names(sorted(people, key=lambda p: p.age)))
    show("attrgetter 等价写法", names(sorted(people, key=operator.attrgetter("age"))))

    note("多键排序：key 返回元组，(dept 升序, age 降序)")
    show("dept↑ 再 age↓", names(sorted(people, key=lambda p: (p.dept, -p.age))))

    note("reverse=True 整体降序")
    show("按 age 降序", names(sorted(people, key=lambda p: p.age, reverse=True)))

    note("稳定排序：只按 dept 排，同组保持原序（Alice 在 Carol 前）")
    show("稳定", names(sorted(people, key=lambda p: p.dept)))

    note("相等性：frozen dataclass 按值判等")
    a = Person("Alice", "eng", 30)
    b = Person("Alice", "eng", 30)
    show("a == b（按值）", a == b)
    show("a is b（不同对象）", a is b)

    note("可哈希 → 放进 set 天然按值去重")
    show("set 去重后数量", len({*people, a}))  # a 与已有 Alice 相等 → 不新增

    note("@total_ordering：写两个方法，得到全套比较运算")
    v1, v2 = Version(1, 2), Version(1, 5)
    show("Version(1,2) < Version(1,5)", v1 < v2)
    show(">= 自动补齐", v2 >= v1)
    show("排序一组版本", sorted([Version(2, 0), Version(1, 5), Version(1, 2)]))
