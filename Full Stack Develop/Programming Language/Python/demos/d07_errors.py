"""07 Error handling — try/except/else/finally and the exception hierarchy.

Key points:
  1. Python expresses errors with exceptions; catch them with try/except, branching by exception type.
  2. else runs when there was "no exception", finally always runs (commonly used for cleanup).
  3. Custom exceptions inherit from Exception; raise ... from preserves the cause chain.
  4. The with context manager automatically manages resources (open/close, lock/unlock).
  5. Idiomatic "easier to ask forgiveness than permission" (EAFP): try first, handle on failure.
"""

from .log import note, show, title


class ValidationError(Exception):
    """A custom exception carrying a business field."""

    def __init__(self, field: str, message: str) -> None:
        super().__init__(f"{field}: {message}")
        self.field = field


def parse_age(text: str) -> int:
    try:
        n = int(text)
    except ValueError as exc:
        # `from exc` keeps the original exception as __cause__ for traceability
        raise ValidationError("age", f"{text!r} is not a number") from exc
    if n < 0:
        raise ValidationError("age", "age cannot be negative")
    return n


class Resource:
    """Context manager: __enter__/__exit__ guarantee the resource is released."""

    def __init__(self, trace: list[str]) -> None:
        self.trace = trace

    def __enter__(self) -> "Resource":
        self.trace.append("open")
        return self

    def __exit__(self, *exc: object) -> None:
        self.trace.append("close")  # runs even if an exception is raised


def run() -> None:
    title("07 Error handling")

    note("catch exceptions by type and read a custom field")
    try:
        parse_age("abc")
    except ValidationError as e:
        show("caught ValidationError", f"{e.field}: {e}")

    note("the execution order of try/except/else/finally")
    order: list[str] = []
    try:
        order.append("try")
        raise ValueError("boom")
    except ValueError:
        order.append("except")
    else:
        order.append("else")  # won't run (because an exception was raised)
    finally:
        order.append("finally")
    show("execution order", order)

    note("raise from: exception chaining, __cause__ points to the root cause")
    try:
        parse_age("xyz")
    except ValidationError as e:
        show("__cause__ type", type(e.__cause__).__name__)

    note("with context manager: auto-close whether or not there's an exception")
    trace: list[str] = []
    try:
        with Resource(trace):
            trace.append("use")
            raise RuntimeError("oops")
    except RuntimeError:
        pass
    show("resource lifecycle", trace)

    note("EAFP: fetch the value first, fall back on KeyError")
    data = {"a": 1}
    try:
        value = data["missing"]
    except KeyError:
        value = -1
    show("EAFP result", value)
