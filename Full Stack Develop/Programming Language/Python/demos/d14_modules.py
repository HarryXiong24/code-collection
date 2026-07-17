"""14 模块 / 导入 / 可见性 —— 一个 .py 文件就是一个模块，一个目录（带 __init__.py）就是包。

要点：
  1. import 有多种写法：import m / from m import name / from m import * / as 改名。
  2. 没有 private 关键字；单下划线 _name 是「内部使用」的约定，__all__ 控制 import *。
  3. 模块顶层代码在「首次导入」时执行一次，之后被缓存（sys.modules）。
  4. if __name__ == "__main__" 区分「被直接运行」还是「被导入」。
  5. 包（package）用目录 + __init__.py 组织，可做子模块聚合。
"""

from . import mathlib  # 导入整个模块，用 mathlib.xxx 访问
from .mathlib import PI, add  # 从模块里挑名字导入

from .log import note, show, title


def run() -> None:
    title("14 模块 / 导入 / 可见性")

    note("import 模块后用点号访问其成员")
    show("mathlib.PI", mathlib.PI)
    show("mathlib.greet('Harry')", mathlib.greet("Harry"))

    note("from ... import：把名字直接搬进当前命名空间")
    show("PI（直接用）", PI)
    show("add(2, 3)", add(2, 3))

    note("__all__ 决定 from mathlib import * 带出哪些名字")
    show("mathlib.__all__", mathlib.__all__)

    note("下划线是约定而非强制：_private 仍能访问，只是不建议")
    show("mathlib._private()", mathlib._private())

    note("模块只被加载一次，顶层代码执行的副作用会保留")
    show("mathlib._loaded_marker", mathlib._loaded_marker)

    note("__name__：被导入时是模块名，被直接运行时才是 '__main__'")
    show("mathlib.__name__", mathlib.__name__)
    show("当前模块 __name__", __name__)
