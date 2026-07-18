"""01 Types & variables — Python is dynamically typed, but supports and encourages type hints.

Key points:
  1. Variables can be used without declaring a type; the annotation `x: int = 1` is for humans and type checkers (mypy/pyright).
  2. Basic types: int / float / str / bool / bytes / None.
  3. int is arbitrary precision and never overflows.
  4. Annotations are not enforced at runtime (not checked); static checkers back them up.
  5. f-strings are the preferred way to format strings.
"""

from .log import note, show, title


def run() -> None:
    title("01 Types & variables")

    note("variables are assigned directly; annotations are optional metadata (not enforced at runtime)")
    name: str = "Harry"
    age: int = 30
    price: float = 9.99
    is_vip: bool = True
    show("name / age / price / is_vip", f"{name} / {age} / {price} / {is_vip}")

    note("int is arbitrary precision and never overflows")
    big = 2**100
    show("2 ** 100", big)

    note("dynamic typing: a variable can be rebound to a value of a different type (not recommended)")
    x: object = 42
    show("x = 42, type", type(x).__name__)
    x = "now a string"
    show("x = 'str', type", type(x).__name__)

    note("None is the only empty value; test it with is, not ==")
    maybe: str | None = None
    show("maybe is None", maybe is None)
    show("maybe or 'default'", maybe or "default")

    note("type conversions are explicit function calls")
    show('int("42")', int("42"))
    show('float("3.14")', float("3.14"))
    show("str(True)", str(True))
    show('bool("")  # empty string is falsy', bool(""))

    note("isinstance / type do runtime type checks")
    show("isinstance(1, int)", isinstance(1, int))
    show("isinstance(True, int)  # bool is a subclass of int", isinstance(True, int))

    note("f-strings support expressions and format specifiers")
    ratio = 0.8137
    show("f'{ratio:.1%}'", f"{ratio:.1%}")
    show("f'{age:>5}'", f"{age:>5}")
