"""15 Custom sorting & equality — sort by your own rules, define "equality" and "ordering" for your own types.

Key points:
  1. sorted(key=...) / list.sort(key=...) take a "key function", more intuitive than passing a comparator.
  2. Multi-key sorting: key returns a tuple (primary, secondary); for descending use reverse=True or negate numbers.
  3. sorted is a stable sort: elements with equal keys keep their original order.
  4. @dataclass(frozen=True) auto-generates __eq__ and __hash__ → value equality, usable in a set/dict.
  5. @total_ordering needs only __eq__ + __lt__, auto-filling all of <=, >, >=, etc.
"""

import operator
from dataclasses import dataclass
from functools import total_ordering

from .log import note, show, title


@dataclass(frozen=True)
class Person:
    """frozen=True → immutable, automatic __eq__/__hash__, usable as a set/dict element."""

    name: str
    dept: str
    age: int


@total_ordering
class Version:
    """@total_ordering: write only __eq__ and __lt__, and the rest of the comparisons are filled in automatically."""

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
    title("15 Custom sorting & equality")

    people = [
        Person("Alice", "eng", 30),
        Person("Bob", "sales", 25),
        Person("Carol", "eng", 25),
        Person("Dave", "sales", 40),
    ]
    names = lambda ps: [p.name for p in ps]  # noqa: E731

    note("single-key sort: key= gives the sort basis (doesn't change the original list)")
    show("by age ascending", names(sorted(people, key=lambda p: p.age)))
    show("attrgetter equivalent", names(sorted(people, key=operator.attrgetter("age"))))

    note("multi-key sort: key returns a tuple, (dept ascending, age descending)")
    show("dept↑ then age↓", names(sorted(people, key=lambda p: (p.dept, -p.age))))

    note("reverse=True for overall descending")
    show("by age descending", names(sorted(people, key=lambda p: p.age, reverse=True)))

    note("stable sort: sort by dept only, keeping original order within a group (Alice before Carol)")
    show("stable", names(sorted(people, key=lambda p: p.dept)))

    note("equality: a frozen dataclass compares by value")
    a = Person("Alice", "eng", 30)
    b = Person("Alice", "eng", 30)
    show("a == b (by value)", a == b)
    show("a is b (different objects)", a is b)

    note("hashable → put in a set for natural dedup by value")
    show("count after set dedup", len({*people, a}))  # a equals the existing Alice → no new entry

    note("@total_ordering: write two methods, get the full set of comparison operators")
    v1, v2 = Version(1, 2), Version(1, 5)
    show("Version(1,2) < Version(1,5)", v1 < v2)
    show(">= filled in automatically", v2 >= v1)
    show("sort a group of versions", sorted([Version(2, 0), Version(1, 5), Version(1, 2)]))
