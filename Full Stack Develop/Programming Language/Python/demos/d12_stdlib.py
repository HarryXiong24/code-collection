"""12 标准库常用惯例 —— json / datetime / pathlib / collections / itertools。

要点：
  1. json.dumps/loads 做序列化；ensure_ascii=False 保留中文。
  2. datetime 处理日期时间，timedelta 做加减。
  3. pathlib.Path 是现代路径操作（面向对象，跨平台）。
  4. collections 提供 Counter / defaultdict 等高频容器。
  5. itertools 提供惰性迭代器工具。
"""

import itertools
import json
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .log import note, show, title


def run() -> None:
    title("12 标准库常用惯例")

    note("json：对象 ↔ 字符串，中文用 ensure_ascii=False")
    user = {"id": 1, "name": "Harry", "roles": ["dev", "admin"]}
    text = json.dumps(user, ensure_ascii=False)
    show("json.dumps", text)
    show("json.loads(...)['roles']", json.loads(text)["roles"])

    note("datetime：ISO 格式、时区、timedelta 加减")
    dt = datetime(2026, 7, 16, 8, 0, tzinfo=timezone.utc)
    show("isoformat()", dt.isoformat())
    show("+1 天", (dt + timedelta(days=1)).strftime("%Y-%m-%d"))

    note("pathlib：面向对象的路径操作（不碰真实磁盘）")
    p = Path("/var/log") / "app" / "server.log"
    show("Path 拼接", str(p))
    show(".name / .suffix", (p.name, p.suffix))
    show(".parts", p.parts)

    note("collections.Counter：一行完成词频统计")
    words = "the cat sat on the mat the end".split()
    show("Counter(words)", dict(Counter(words)))
    show("most_common(2)", Counter(words).most_common(2))

    note("defaultdict：自动初始化，分组不用先判空")
    groups: defaultdict[str, list[str]] = defaultdict(list)
    for name in ["alice", "bob", "amy"]:
        groups[name[0]].append(name)
    show("按首字母分组", dict(groups))

    note("itertools：惰性迭代器工具")
    show("accumulate 前缀和", list(itertools.accumulate([1, 2, 3, 4])))
    show("chain 拼接", list(itertools.chain([1, 2], [3, 4])))
    show("islice 取前 3", list(itertools.islice(itertools.count(10), 3)))

    note("字符串：不可变，方法返回新串")
    s = "  Hello, Python  "
    show("strip().upper()", s.strip().upper())
    show("'a-b-c'.split('-')", "a-b-c".split("-"))
    show("'-'.join(...)", "-".join(["x", "y", "z"]))
