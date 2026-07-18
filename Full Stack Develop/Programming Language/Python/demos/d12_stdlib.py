"""12 Common standard-library idioms — json / datetime / pathlib / collections / itertools.

Key points:
  1. json.dumps/loads do serialization; ensure_ascii=False preserves non-ASCII characters.
  2. datetime handles dates and times, timedelta does arithmetic.
  3. pathlib.Path is modern path manipulation (object-oriented, cross-platform).
  4. collections provides high-frequency containers like Counter / defaultdict.
  5. itertools provides lazy iterator utilities.
"""

import itertools
import json
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .log import note, show, title


def run() -> None:
    title("12 Common standard-library idioms")

    note("json: object ↔ string, use ensure_ascii=False for non-ASCII")
    user = {"id": 1, "name": "Harry", "roles": ["dev", "admin"]}
    text = json.dumps(user, ensure_ascii=False)
    show("json.dumps", text)
    show("json.loads(...)['roles']", json.loads(text)["roles"])

    note("datetime: ISO format, time zones, timedelta arithmetic")
    dt = datetime(2026, 7, 16, 8, 0, tzinfo=timezone.utc)
    show("isoformat()", dt.isoformat())
    show("+1 day", (dt + timedelta(days=1)).strftime("%Y-%m-%d"))

    note("pathlib: object-oriented path manipulation (doesn't touch the real disk)")
    p = Path("/var/log") / "app" / "server.log"
    show("Path join", str(p))
    show(".name / .suffix", (p.name, p.suffix))
    show(".parts", p.parts)

    note("collections.Counter: word-frequency counting in one line")
    words = "the cat sat on the mat the end".split()
    show("Counter(words)", dict(Counter(words)))
    show("most_common(2)", Counter(words).most_common(2))

    note("defaultdict: auto-initializes, no empty check needed when grouping")
    groups: defaultdict[str, list[str]] = defaultdict(list)
    for name in ["alice", "bob", "amy"]:
        groups[name[0]].append(name)
    show("grouped by first letter", dict(groups))

    note("itertools: lazy iterator utilities")
    show("accumulate prefix sums", list(itertools.accumulate([1, 2, 3, 4])))
    show("chain concatenation", list(itertools.chain([1, 2], [3, 4])))
    show("islice take first 3", list(itertools.islice(itertools.count(10), 3)))

    note("strings: immutable, methods return a new string")
    s = "  Hello, Python  "
    show("strip().upper()", s.strip().upper())
    show("'a-b-c'.split('-')", "a-b-c".split("-"))
    show("'-'.join(...)", "-".join(["x", "y", "z"]))
