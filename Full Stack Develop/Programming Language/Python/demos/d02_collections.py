"""02 Collection types — list / tuple / dict / set, and comprehensions.

Key points:
  1. list is mutable and ordered; tuple is immutable and ordered (often used for "multi-value returns/records").
  2. dict is a hash table that preserves insertion order (guaranteed 3.7+); set deduplicates and is unordered.
  3. Comprehensions are Python's most distinctive syntax.
  4. Slicing s[start:stop:step] works for sequences in general.
  5. Annotate with built-in generics: list[int] / dict[str, int] / tuple[int, ...] (3.9+).
"""

from .log import note, show, title


def run() -> None:
    title("02 Collection types")

    note("list: mutable, ordered, annotated as list[int]")
    nums: list[int] = [3, 1, 4, 1, 5, 9]
    show("nums", nums)
    nums.append(2)
    show("append(2)", nums)
    show("sorted(nums)  # returns a new list", sorted(nums))

    note("list comprehension: map + filter in one line")
    show("[x*x for x in nums if x > 3]", [x * x for x in nums if x > 3])

    note("slicing: start:stop:step, supports negative indices and reversal")
    show("nums[1:4]", nums[1:4])
    show("nums[::-1]  # reverse", nums[::-1])
    show("nums[-1]  # last element", nums[-1])

    show("nums reversed()", list(reversed(nums)))  # reverse
    show("nums sort()", sorted(nums))  # sort

    note("tuple: immutable, often used for multi-value returns and unpacking")
    point: tuple[int, int] = (10, 20)
    x, y = point  # unpacking
    show("x, y = point", (x, y))
    first, *rest = nums  # star collects the rest
    show("first, *rest", (first, rest))

    note("dict: a hash table, preserves insertion order; .get with a default avoids KeyError")
    scores: dict[str, int] = {"alice": 95, "bob": 82}
    scores["carol"] = 78
    del scores["bob"]
    show("scores.get('zoe', 0)", scores.get("zoe", 0))
    show("list(scores.items())", list(scores.items()))

    note("dict comprehension: swap keys/values / transform in bulk")
    show("{k: v*2 for k,v in ...}", {k: v * 2 for k, v in scores.items()})

    note("set: automatic dedup, natural support for intersection/union/difference")
    a = {1, 2, 2, 3, 3, 3}
    b = {2, 3, 4}
    show("{1,2,2,3,3,3}", a)
    show("intersection a & b", a & b)
    show("union a | b", a | b)
    show("difference a - b", a - b)

    note("merge dicts: the | operator (3.9+)")
    base = {"host": "localhost", "port": 80}
    show("base | {'port': 443}", base | {"port": 443})
