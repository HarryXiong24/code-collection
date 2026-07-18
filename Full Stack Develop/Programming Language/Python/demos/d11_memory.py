"""11 Memory / references / mutability — in Python everything is an object, and a variable is a "name stuck onto an object".

Key points:
  1. A variable is a reference (a name); assignment just points the name at an object, it doesn't copy the object.
  2. Immutable types (int/str/tuple/frozenset) can't be changed; "changing" is really rebinding.
  3. In-place changes to mutable types (list/dict/set) are seen by all references.
  4. is compares "whether it's the same object", == compares "whether the values are equal".
  5. A mutable default argument is a classic trap; shallow copy vs deep copy (deepcopy).
"""

import copy

from .log import note, show, title


def bad_append(item: int, bucket: list[int] = []) -> list[int]:
    """Anti-example: the default [] is created once at definition time and shared across all calls."""
    bucket.append(item)
    return bucket


def good_append(item: int, bucket: list[int] | None = None) -> list[int]:
    """Correct way: use None as a sentinel and create a new list on each call."""
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket


def run() -> None:
    title("11 Memory / references / mutability")

    note("a variable is a reference: two names point at the same list, changing one changes the other")
    a = [1, 2, 3]
    b = a
    b.append(4)
    show("a (changed via b)", a)
    show("a is b", a is b)

    note("is vs ==: equal values don't mean the same object")
    x = [1, 2]
    y = [1, 2]
    show("x == y (equal values)", x == y)
    show("x is y (different objects)", x is y)

    note("immutable objects: 'changing' an int/str is really rebinding the name")
    n = 10
    original_id = id(n)
    n += 5
    show("id changed after int +=", id(n) != original_id)

    note("mutable default argument trap: the default [] is shared across calls")
    show("bad_append(1)", bad_append(1))
    show("bad_append(2)  # accumulated!", bad_append(2))
    show("good_append(1)", good_append(1))
    show("good_append(2)  # clean", good_append(2))

    note("shallow copy copies only one level; nested data is still shared")
    original = {"name": "Harry", "tags": ["a", "b"]}
    shallow = copy.copy(original)
    shallow["tags"].append("c")  # changes the shared list
    show("original.tags (changed via the shallow copy)", original["tags"])

    note("deep copy fully severs the references")
    deep = copy.deepcopy(original)
    deep["tags"].append("z")
    show("original.tags (unaffected by deep copy, no z)", original["tags"])
    show("deep.tags (an independent copy)", deep["tags"])
