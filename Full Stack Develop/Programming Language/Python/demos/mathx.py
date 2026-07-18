"""Example functions under test, used by tests/test_demos.py."""

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
