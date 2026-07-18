"""04 Control flow — if/elif, for, while, match (structural pattern matching).

Key points:
  1. Blocks are marked by indentation, not braces.
  2. for iterates any "iterable" directly; enumerate gives the index, zip iterates in parallel.
  3. for/while can carry an else: it runs only when the loop ends normally (no break).
  4. match (3.10+) is true structural pattern matching, far more powerful than switch.
  5. Truthiness: empty containers, 0, "", and None are all falsy.
"""

from .log import note, show, title


def area(shape: dict[str, float]) -> float:
    """Use match to structurally match a "dict with a kind"."""
    match shape:
        case {"kind": "circle", "r": r}:
            return 3.14159 * r * r
        case {"kind": "square", "side": s}:
            return s * s
        case {"kind": "rect", "w": w, "h": h}:
            return w * h
        case _:
            raise ValueError(f"unknown shape: {shape}")


def run() -> None:
    title("04 Control flow")

    note("if / elif / else and the ternary expression")
    score = 82
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    show("grade", grade)

    note("enumerate: get the index and value together while iterating")
    for i, fruit in enumerate(["apple", "banana", "cherry"]):
        show(f"fruits[{i}]", fruit)

    note("zip: iterate multiple sequences in parallel")
    for name, sc in zip(["alice", "bob"], [95, 82]):
        show(f"{name}", sc)

    note("for-else: else runs only if the loop wasn't broken (here demoing prime detection)")
    n = 13
    for d in range(2, n):
        if n % d == 0:
            show(f"{n} has a factor", d)
            break
    else:
        show(f"{n} is prime", True)

    note("match: structural pattern matching, destructures dicts/objects directly")
    show("area(circle r=2)", round(area({"kind": "circle", "r": 2}), 2))
    show("area(rect 3x4)", area({"kind": "rect", "w": 3, "h": 4}))

    note("truthiness trap: empty containers and 0 are both falsy")
    items: list[int] = []
    show("items or 'empty'", items or "empty")
    count = 0
    show("count or 'N/A'  # 0 falls into the fallback", count or "N/A")
    show("'N/A' if count is None else count  # precise None check", "N/A" if count is None else count)
