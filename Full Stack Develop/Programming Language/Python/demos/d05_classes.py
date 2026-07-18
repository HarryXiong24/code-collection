"""05 Classes / dataclasses / protocols — Python uses class to carry data and behavior.

Key points:
  1. @dataclass auto-generates __init__/__repr__/__eq__, the preferred way to write a "struct".
  2. An ordinary class has __init__, methods, @property, and inheritance.
  3. Protocol (structural subtyping) = the static version of duck typing, corresponding to Go interfaces / TS interface.
  4. A single underscore _x is "private by convention"; a double underscore __x triggers name mangling.
  5. @override (3.12+) explicitly marks an overriding method; a typo gets caught by the checker.
"""

from dataclasses import dataclass, field
from typing import Protocol, override

from .log import note, show, title


@dataclass
class User:
    """Dataclass: one annotation equals one field, with __init__/__repr__/__eq__ automatically."""

    id: int
    name: str
    email: str | None = None
    tags: list[str] = field(default_factory=list)  # a mutable default must use a factory


class Greeter(Protocol):
    """Protocol: any object with greet() counts as a Greeter, no explicit inheritance needed."""

    def greet(self) -> str: ...


class Account:
    def __init__(self, owner: str, initial: int = 0) -> None:
        self.owner = owner
        self._balance = initial  # private by convention

    def deposit(self, amount: int) -> "Account":
        self._balance += amount
        return self  # returning self supports method chaining

    @property
    def summary(self) -> str:  # accessed like an attribute: acc.summary
        return f"{self.owner}: ¥{self._balance}"

    def greet(self) -> str:  # implicitly satisfies the Greeter protocol
        return f"Hi, I'm {self.owner}"


class VipAccount(Account):
    def __init__(self, owner: str, initial: int, level: str) -> None:
        super().__init__(owner, initial)
        self.level = level

    @override
    def greet(self) -> str:
        return f"{super().greet()} (VIP {self.level})"


def announce(g: Greeter) -> str:
    """Accepts any object satisfying the Greeter protocol (structural typing)."""
    return g.greet()


def run() -> None:
    title("05 Classes / dataclasses / protocols")

    note("@dataclass: automatic __init__/__repr__/__eq__")
    u1 = User(1, "Harry")
    u2 = User(1, "Harry")
    show("User(1, 'Harry')", u1)
    show("u1 == u2  # compared by fields", u1 == u2)

    note("ordinary class: method chaining + @property")
    acc = Account("Harry", 100).deposit(50).deposit(20)
    show("acc.summary", acc.summary)

    note("Protocol structural subtyping: Account didn't inherit Greeter but can still be passed in")
    show("announce(acc)", announce(acc))

    note("inheritance + @override + super()")
    vip = VipAccount("Alice", 1000, "Gold").deposit(500)
    show("vip.greet()", vip.greet())
    show("vip.summary", vip.summary)
    show("isinstance(vip, Account)", isinstance(vip, Account))
