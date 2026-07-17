"""04 控制流 —— if/elif、for、while、match（结构化模式匹配）。

要点：
  1. 用缩进而非大括号表示代码块。
  2. for 直接遍历「可迭代对象」；enumerate 拿下标，zip 并行遍历。
  3. for/while 可带 else：循环正常结束（没 break）才执行。
  4. match（3.10+）是真正的结构化模式匹配，比 switch 强大得多。
  5. 真值判断：空容器、0、""、None 都为假（falsy）。
"""

from .log import note, show, title


def area(shape: dict[str, float]) -> float:
    """用 match 对「带 kind 的字典」做结构化匹配。"""
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
    title("04 控制流")

    note("if / elif / else 与三元表达式")
    score = 82
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    show("grade", grade)

    note("enumerate：遍历时同时拿下标和值")
    for i, fruit in enumerate(["apple", "banana", "cherry"]):
        show(f"fruits[{i}]", fruit)

    note("zip：并行遍历多个序列")
    for name, sc in zip(["alice", "bob"], [95, 82]):
        show(f"{name}", sc)

    note("for-else：循环没被 break 才走 else（这里找质数演示）")
    n = 13
    for d in range(2, n):
        if n % d == 0:
            show(f"{n} 有因子", d)
            break
    else:
        show(f"{n} 是质数", True)

    note("match：结构化模式匹配，直接解构字典/对象")
    show("area(circle r=2)", round(area({"kind": "circle", "r": 2}), 2))
    show("area(rect 3x4)", area({"kind": "rect", "w": 3, "h": 4}))

    note("真值陷阱：空容器与 0 都是 falsy")
    items: list[int] = []
    show("items or 'empty'", items or "empty")
    count = 0
    show("count or 'N/A'  # 0 掉进兜底", count or "N/A")
    show("'N/A' if count is None else count  # 精确判空", "N/A" if count is None else count)
