"""One .py file is a module. This is the example module imported by d14_modules.py.

__all__ controls which names `from mathlib import *` brings out;
a single-underscore prefix (_private) is an "internal use" convention, and import * won't include it either.
"""

# module-level constant
PI = 3.14159

# only names listed in __all__ are exported by `from mathlib import *`
__all__ = ["PI", "add", "greet"]


def add(a: float, b: float) -> float:
    return a + b


def greet(name: str) -> str:
    return f"Hi, {name}"


def _private() -> str:
    """Leading underscore: conventionally an internal function, not recommended for external use (but technically still accessible)."""
    return "internal-only"


# When the module is first imported, this top-level code runs once (like "module initialization" in other languages)
_loaded_marker = "mathlib loaded"
