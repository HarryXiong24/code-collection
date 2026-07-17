"""05 类 / 数据类 / 协议 —— Python 用 class 承载数据与行为。

要点：
  1. @dataclass 自动生成 __init__/__repr__/__eq__，是「结构体」的首选写法。
  2. 普通 class 有 __init__、方法、@property、继承。
  3. Protocol（结构化子类型）= 鸭子类型的静态版，对应 Go 接口 / TS interface。
  4. 单下划线 _x 是「约定私有」，双下划线 __x 触发名称改写。
  5. @override（3.12+）显式标注覆盖父类方法，拼错会被检查器发现。
"""

from dataclasses import dataclass, field
from typing import Protocol, override

from .log import note, show, title


@dataclass
class User:
    """数据类：一行注解等于一个字段，自动有 __init__/__repr__/__eq__。"""

    id: int
    name: str
    email: str | None = None
    tags: list[str] = field(default_factory=list)  # 可变默认值必须用 factory


class Greeter(Protocol):
    """协议：任何有 greet() 的对象都算 Greeter，无需显式继承。"""

    def greet(self) -> str: ...


class Account:
    def __init__(self, owner: str, initial: int = 0) -> None:
        self.owner = owner
        self._balance = initial  # 约定私有

    def deposit(self, amount: int) -> "Account":
        self._balance += amount
        return self  # 返回 self 支持链式调用

    @property
    def summary(self) -> str:  # 像属性一样访问：acc.summary
        return f"{self.owner}: ¥{self._balance}"

    def greet(self) -> str:  # 隐式满足 Greeter 协议
        return f"Hi, I'm {self.owner}"


class VipAccount(Account):
    def __init__(self, owner: str, initial: int, level: str) -> None:
        super().__init__(owner, initial)
        self.level = level

    @override
    def greet(self) -> str:
        return f"{super().greet()} (VIP {self.level})"


def announce(g: Greeter) -> str:
    """接收任何满足 Greeter 协议的对象（结构化类型）。"""
    return g.greet()


def run() -> None:
    title("05 类 / 数据类 / 协议")

    note("@dataclass：自动 __init__/__repr__/__eq__")
    u1 = User(1, "Harry")
    u2 = User(1, "Harry")
    show("User(1, 'Harry')", u1)
    show("u1 == u2  # 按字段比较", u1 == u2)

    note("普通类：链式调用 + @property")
    acc = Account("Harry", 100).deposit(50).deposit(20)
    show("acc.summary", acc.summary)

    note("Protocol 结构化子类型：Account 没继承 Greeter 也能传进去")
    show("announce(acc)", announce(acc))

    note("继承 + @override + super()")
    vip = VipAccount("Alice", 1000, "Gold").deposit(500)
    show("vip.greet()", vip.greet())
    show("vip.summary", vip.summary)
    show("isinstance(vip, Account)", isinstance(vip, Account))
