"""01 类型与变量 —— Python 是动态类型，但支持并鼓励类型注解（type hints）。

要点：
  1. 变量无需声明类型即可用；注解 `x: int = 1` 是给人和类型检查器（mypy/pyright）看的。
  2. 基本类型：int / float / str / bool / bytes / None。
  3. int 是任意精度的，不会溢出。
  4. 注解在运行时不强制（不检查），要靠静态检查器兜底。
  5. f-string 是首选的字符串格式化方式。
"""

from .log import note, show, title


def run() -> None:
    title("01 类型与变量")

    note("变量直接赋值；注解是可选的元信息（运行时不强制）")
    name: str = "Harry"
    age: int = 30
    price: float = 9.99
    is_vip: bool = True
    show("name / age / price / is_vip", f"{name} / {age} / {price} / {is_vip}")

    note("int 是任意精度，永不溢出")
    big = 2**100
    show("2 ** 100", big)

    note("动态类型：同名变量可被重新绑定到不同类型的值（但不推荐）")
    x: object = 42
    show("x = 42, type", type(x).__name__)
    x = "now a string"
    show("x = 'str', type", type(x).__name__)

    note("None 是唯一的空值；用 is 判断，不用 ==")
    maybe: str | None = None
    show("maybe is None", maybe is None)
    show("maybe or 'default'", maybe or "default")

    note("类型转换是显式函数调用")
    show('int("42")', int("42"))
    show('float("3.14")', float("3.14"))
    show("str(True)", str(True))
    show('bool("")  # 空串为假', bool(""))

    note("isinstance / type 做运行时类型判断")
    show("isinstance(1, int)", isinstance(1, int))
    show("isinstance(True, int)  # bool 是 int 子类", isinstance(True, int))

    note("f-string 支持表达式、格式说明符")
    ratio = 0.8137
    show("f'{ratio:.1%}'", f"{ratio:.1%}")
    show("f'{age:>5}'", f"{age:>5}")
