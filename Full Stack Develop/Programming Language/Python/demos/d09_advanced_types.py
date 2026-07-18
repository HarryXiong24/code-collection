"""09 Advanced types — unions, Literal, Enum, TypedDict, type aliases, narrowing.

Key points:
  1. Union types use `A | B` (3.10+); Optional[T] is just T | None.
  2. Literal restricts values to a few literals, a lightweight enum.
  3. Enum is an enum with runtime objects, supporting forward and reverse lookup.
  4. TypedDict adds types to a "dict with a fixed shape".
  5. The type statement (3.12+) defines a type alias; isinstance lets the checker narrow automatically.
"""

from enum import Enum
from typing import Literal, TypedDict

from .log import note, show, title

# the type statement (3.12+): defines a type alias
type Direction = Literal["up", "down", "left", "right"]


class Status(Enum):
    ACTIVE = "ACTIVE"
    CLOSED = "CLOSED"


class UserDict(TypedDict):
    """A dict with a fixed shape: both key names and value types are checked."""

    id: int
    name: str
    active: bool


def format_value(v: int | str | float) -> str:
    """Union type + isinstance narrowing: the type is precisely determined in each branch."""
    if isinstance(v, bool):  # note bool is a subclass of int, so check it first
        return f"bool:{v}"
    if isinstance(v, int):
        return f"int:{v}"
    if isinstance(v, float):
        return f"float:{v:.2f}"
    return f"str:{v.upper()}"


def run() -> None:
    title("09 Advanced types")

    note("Literal: only these literals are allowed; a wrong one is blocked by the checker")
    move: Direction = "up"
    show("move", move)

    note("Enum: has runtime objects, supports forward and reverse lookup")
    show("Status.ACTIVE", Status.ACTIVE.value)
    show("Status('CLOSED')  # reverse lookup", Status("CLOSED").name)
    show("list(Status)", [s.value for s in Status])

    note("union type + isinstance narrowing")
    show("format_value(42)", format_value(42))
    show("format_value(3.14159)", format_value(3.14159))
    show("format_value('hi')", format_value("hi"))

    note("TypedDict: add types to a dict with a fixed shape")
    user: UserDict = {"id": 1, "name": "Harry", "active": True}
    show("TypedDict user", user)
