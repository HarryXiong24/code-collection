"""被测函数示例，供 tests/test_demos.py 使用。"""

from typing import Literal


def classify(n: int) -> Literal["negative", "zero", "positive"]:
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("division by zero")
    return a / b
