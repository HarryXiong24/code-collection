"""09 高级类型 —— 联合、Literal、Enum、TypedDict、类型别名、收窄。

要点：
  1. 联合类型用 `A | B`（3.10+）；Optional[T] 就是 T | None。
  2. Literal 把取值限定为几个字面量，是轻量枚举。
  3. Enum 是有运行时对象的枚举，可正查反查。
  4. TypedDict 给「固定形状的字典」加类型。
  5. type 语句（3.12+）定义类型别名；isinstance 让检查器自动收窄。
"""

from enum import Enum
from typing import Literal, TypedDict

from .log import note, show, title

# type 语句（3.12+）：定义类型别名
type Direction = Literal["up", "down", "left", "right"]


class Status(Enum):
    ACTIVE = "ACTIVE"
    CLOSED = "CLOSED"


class UserDict(TypedDict):
    """固定形状的字典：键名与值类型都受检查。"""

    id: int
    name: str
    active: bool


def format_value(v: int | str | float) -> str:
    """联合类型 + isinstance 收窄：每个分支里类型都被精确判定。"""
    if isinstance(v, bool):  # 注意 bool 是 int 子类，需先判
        return f"bool:{v}"
    if isinstance(v, int):
        return f"int:{v}"
    if isinstance(v, float):
        return f"float:{v:.2f}"
    return f"str:{v.upper()}"


def run() -> None:
    title("09 高级类型")

    note("Literal：只能取这几个字面量，传错会被检查器拦下")
    move: Direction = "up"
    show("move", move)

    note("Enum：有运行时对象，可正查反查")
    show("Status.ACTIVE", Status.ACTIVE.value)
    show("Status('CLOSED')  # 反查", Status("CLOSED").name)
    show("list(Status)", [s.value for s in Status])

    note("联合类型 + isinstance 收窄")
    show("format_value(42)", format_value(42))
    show("format_value(3.14159)", format_value(3.14159))
    show("format_value('hi')", format_value("hi"))

    note("TypedDict：给固定形状的字典加类型")
    user: UserDict = {"id": 1, "name": "Harry", "active": True}
    show("TypedDict user", user)
