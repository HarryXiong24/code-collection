"""Entry point for the Python language usage demos.

    python main.py                 run all demos
    python main.py generics async  run only the specified ones
    python -m unittest             run the unit tests (see tests/test_demos.py)
"""

import sys
from collections.abc import Callable

from demos import (
    d01_types,
    d02_collections,
    d03_functions,
    d04_control_flow,
    d05_classes,
    d06_generics,
    d07_errors,
    d08_async,
    d09_advanced_types,
    d10_decorators,
    d11_memory,
    d12_stdlib,
    d13_iterators,
    d14_modules,
    d15_sorting_equality,
)
from demos.log import error, note, title

# demo name → run function; the order corresponds one-to-one to the TypeScript / Go projects.
DEMOS: dict[str, Callable[[], None]] = {
    "types": d01_types.run,
    "collections": d02_collections.run,
    "functions": d03_functions.run,
    "control-flow": d04_control_flow.run,
    "classes": d05_classes.run,
    "generics": d06_generics.run,
    "errors": d07_errors.run,
    "async": d08_async.run,
    "advanced-types": d09_advanced_types.run,
    "decorators": d10_decorators.run,
    "memory": d11_memory.run,
    "stdlib": d12_stdlib.run,
    "iterators": d13_iterators.run,
    "modules": d14_modules.run,
    "sorting": d15_sorting_equality.run,
}


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    unknown = [a for a in args if a not in DEMOS]
    if unknown:
        error(f"unknown demo: {', '.join(unknown)}")
        note(f"options: {' | '.join(DEMOS)}")
        sys.exit(1)

    names = args or list(DEMOS)
    title("Python language usage demos")
    for name in names:
        DEMOS[name]()
    print()


if __name__ == "__main__":
    main()
