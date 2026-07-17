"""一个 .py 文件就是一个模块。这是被 d14_modules.py 导入的示例模块。

__all__ 控制 `from mathlib import *` 会带出哪些名字；
单下划线前缀（_private）是「内部使用」的约定，import * 也不会带上它。
"""

# 模块级常量
PI = 3.14159

# 只有列在 __all__ 里的名字会被 `from mathlib import *` 导出
__all__ = ["PI", "add", "greet"]


def add(a: float, b: float) -> float:
    return a + b


def greet(name: str) -> str:
    return f"Hi, {name}"


def _private() -> str:
    """下划线开头：约定为内部函数，不建议外部直接用（但技术上仍可访问）。"""
    return "internal-only"


# 模块首次被导入时，这段顶层代码会执行一次（类似其它语言的「模块初始化」）
_loaded_marker = "mathlib 已加载"
