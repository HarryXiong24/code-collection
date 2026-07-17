"""07 错误处理 —— try/except/else/finally 与异常层级。

要点：
  1. Python 用异常表达错误；捕获用 try/except，可按异常类型分支。
  2. else 在「没异常」时执行，finally 总会执行（常用于收尾）。
  3. 自定义异常继承 Exception；raise ... from 保留原因链。
  4. with 上下文管理器自动管理资源（打开/关闭、加锁/解锁）。
  5. 惯用「请求原谅而非许可」（EAFP）：先做，出错再处理。
"""

from .log import note, show, title


class ValidationError(Exception):
    """自定义异常，带上业务字段。"""

    def __init__(self, field: str, message: str) -> None:
        super().__init__(f"{field}: {message}")
        self.field = field


def parse_age(text: str) -> int:
    try:
        n = int(text)
    except ValueError as exc:
        # from exc 保留原始异常作为 __cause__，方便追溯
        raise ValidationError("age", f"{text!r} 不是数字") from exc
    if n < 0:
        raise ValidationError("age", "年龄不能为负")
    return n


class Resource:
    """上下文管理器：__enter__/__exit__ 保证资源被释放。"""

    def __init__(self, trace: list[str]) -> None:
        self.trace = trace

    def __enter__(self) -> "Resource":
        self.trace.append("open")
        return self

    def __exit__(self, *exc: object) -> None:
        self.trace.append("close")  # 即使抛异常也会执行


def run() -> None:
    title("07 错误处理")

    note("按类型捕获异常，读自定义字段")
    try:
        parse_age("abc")
    except ValidationError as e:
        show("捕获 ValidationError", f"{e.field}: {e}")

    note("try/except/else/finally 的执行顺序")
    order: list[str] = []
    try:
        order.append("try")
        raise ValueError("boom")
    except ValueError:
        order.append("except")
    else:
        order.append("else")  # 不会执行（因为抛了异常）
    finally:
        order.append("finally")
    show("执行顺序", order)

    note("raise from：异常链，__cause__ 指向根因")
    try:
        parse_age("xyz")
    except ValidationError as e:
        show("__cause__ 类型", type(e.__cause__).__name__)

    note("with 上下文管理器：无论是否异常都自动 close")
    trace: list[str] = []
    try:
        with Resource(trace):
            trace.append("use")
            raise RuntimeError("oops")
    except RuntimeError:
        pass
    show("资源生命周期", trace)

    note("EAFP：先取值，KeyError 再兜底")
    data = {"a": 1}
    try:
        value = data["missing"]
    except KeyError:
        value = -1
    show("EAFP 结果", value)
