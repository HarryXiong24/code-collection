"""14 Modules / imports / visibility — one .py file is a module, one directory (with __init__.py) is a package.

Key points:
  1. import has several forms: import m / from m import name / from m import * / as to rename.
  2. There's no private keyword; a single underscore _name is an "internal use" convention, and __all__ controls import *.
  3. Module top-level code runs once on "first import", then is cached (sys.modules).
  4. if __name__ == "__main__" distinguishes "run directly" from "imported".
  5. A package is organized with a directory + __init__.py, and can aggregate submodules.
"""

from . import mathlib  # import the whole module, access via mathlib.xxx
from .mathlib import PI, add  # pick names to import from the module

from .log import note, show, title


def run() -> None:
    title("14 Modules / imports / visibility")

    note("after importing a module, access its members with the dot")
    show("mathlib.PI", mathlib.PI)
    show("mathlib.greet('Harry')", mathlib.greet("Harry"))

    note("from ... import: bring names directly into the current namespace")
    show("PI (used directly)", PI)
    show("add(2, 3)", add(2, 3))

    note("__all__ decides which names `from mathlib import *` brings out")
    show("mathlib.__all__", mathlib.__all__)

    note("the underscore is a convention, not enforced: _private is still accessible, just discouraged")
    show("mathlib._private()", mathlib._private())

    note("a module is loaded only once; side effects of top-level code persist")
    show("mathlib._loaded_marker", mathlib._loaded_marker)

    note("__name__: the module name when imported, only '__main__' when run directly")
    show("mathlib.__name__", mathlib.__name__)
    show("current module __name__", __name__)
