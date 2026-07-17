"""11 内存 / 引用 / 可变性 —— Python 一切皆对象，变量是「贴在对象上的名字」。

要点：
  1. 变量是引用（名字），赋值只是让名字指向对象，不复制对象。
  2. 不可变类型（int/str/tuple/frozenset）改不了，"改" 其实是重新绑定。
  3. 可变类型（list/dict/set）就地修改会被所有引用看到。
  4. is 比较「是不是同一个对象」，== 比较「值是否相等」。
  5. 可变默认参数是经典大坑；浅拷贝 copy vs 深拷贝 deepcopy。
"""

import copy

from .log import note, show, title


def bad_append(item: int, bucket: list[int] = []) -> list[int]:
    """反例：默认值 [] 只在定义时创建一次，被历次调用共享。"""
    bucket.append(item)
    return bucket


def good_append(item: int, bucket: list[int] | None = None) -> list[int]:
    """正确写法：用 None 作哨兵，每次调用新建列表。"""
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket


def run() -> None:
    title("11 内存 / 引用 / 可变性")

    note("变量是引用：两个名字指向同一个 list，改一个另一个也变")
    a = [1, 2, 3]
    b = a
    b.append(4)
    show("a（被 b 改到）", a)
    show("a is b", a is b)

    note("is vs ==：值相等不代表是同一个对象")
    x = [1, 2]
    y = [1, 2]
    show("x == y（值相等）", x == y)
    show("x is y（不同对象）", x is y)

    note("不可变对象：'改' int/str 其实是重新绑定名字")
    n = 10
    original_id = id(n)
    n += 5
    show("int += 后 id 变了", id(n) != original_id)

    note("可变默认参数大坑：默认 [] 被多次调用共享")
    show("bad_append(1)", bad_append(1))
    show("bad_append(2)  # 累积了!", bad_append(2))
    show("good_append(1)", good_append(1))
    show("good_append(2)  # 干净", good_append(2))

    note("浅拷贝只复制一层，嵌套仍共享")
    original = {"name": "Harry", "tags": ["a", "b"]}
    shallow = copy.copy(original)
    shallow["tags"].append("c")  # 改到共享的列表
    show("original.tags（被浅拷贝改到）", original["tags"])

    note("深拷贝彻底断开引用")
    deep = copy.deepcopy(original)
    deep["tags"].append("z")
    show("original.tags（深拷贝不影响，无 z）", original["tags"])
    show("deep.tags（独立的副本）", deep["tags"])
