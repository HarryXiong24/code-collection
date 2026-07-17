"""极简打印工具的 Python 版：把「表达式 → 结果」对齐打印出来。

对应 TypeScript 的 src/log.ts、Go 的 internal/logx/logx.go。
"""

from typing import Any

_RESET = "\033[0m"
_DIM = "\033[2m"
_BOLD = "\033[1m"
_CYAN = "\033[36m"
_GREEN = "\033[32m"
_RED = "\033[31m"


def title(text: str) -> None:
    """打印一节的标题。"""
    line = "━" * max(0, 40 - len(text))
    print(f"\n{_BOLD}{_CYAN}━━ {text} {line}{_RESET}")


def note(text: str) -> None:
    """打印一行讲解（灰色 # 注释）。"""
    print(f"  {_DIM}# {text}{_RESET}")


def show(expr: str, value: Any) -> None:
    """打印「表达式 → 结果」，对齐成 expr → value。"""
    pad = max(1, 44 - len(expr))
    print(f"  {_GREEN}{expr}{' ' * pad}{_RESET}{_DIM}→{_RESET} {_format(value)}")


def error(text: str) -> None:
    """打印一条错误行。"""
    print(f"  {_RED}✗ {text}{_RESET}")


def _format(v: Any) -> str:
    if v is None:
        return "None"
    if isinstance(v, str):
        return f'"{v}"'
    return repr(v)
