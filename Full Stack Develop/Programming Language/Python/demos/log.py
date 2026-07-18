"""The Python version of the minimal printing helper: prints "expression → result" aligned.

Corresponds to TypeScript's src/log.ts and Go's internal/logx/logx.go.
"""

from typing import Any

_RESET = "\033[0m"
_DIM = "\033[2m"
_BOLD = "\033[1m"
_CYAN = "\033[36m"
_GREEN = "\033[32m"
_RED = "\033[31m"


def title(text: str) -> None:
    """Print a section heading."""
    line = "━" * max(0, 40 - len(text))
    print(f"\n{_BOLD}{_CYAN}━━ {text} {line}{_RESET}")


def note(text: str) -> None:
    """Print an explanatory line (a dimmed # comment)."""
    print(f"  {_DIM}# {text}{_RESET}")


def show(expr: str, value: Any) -> None:
    """Print "expression → result", aligned as expr → value."""
    pad = max(1, 44 - len(expr))
    print(f"  {_GREEN}{expr}{' ' * pad}{_RESET}{_DIM}→{_RESET} {_format(value)}")


def error(text: str) -> None:
    """Print an error line."""
    print(f"  {_RED}✗ {text}{_RESET}")


def _format(v: Any) -> str:
    if v is None:
        return "None"
    if isinstance(v, str):
        return f'"{v}"'
    return repr(v)
