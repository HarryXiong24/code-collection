"""02 集合类型 —— list / tuple / dict / set，以及推导式。

要点：
  1. list 可变、有序；tuple 不可变、有序（常用于「多值返回/记录」）。
  2. dict 是哈希表，保留插入顺序（3.7+ 保证）；set 去重、无序。
  3. 推导式（comprehension）是 Python 最有辨识度的语法。
  4. 切片 s[start:stop:step] 对序列通用。
  5. 注解用内置泛型：list[int] / dict[str, int] / tuple[int, ...]（3.9+）。
"""

from .log import note, show, title


def run() -> None:
    title("02 集合类型")

    note("list：可变、有序，注解为 list[int]")
    nums: list[int] = [3, 1, 4, 1, 5, 9]
    show("nums", nums)
    nums.append(2)
    show("append(2)", nums)
    show("sorted(nums)  # 返回新列表", sorted(nums))

    note("列表推导式：一行完成 map + filter")
    show("[x*x for x in nums if x > 3]", [x * x for x in nums if x > 3])

    note("切片：start:stop:step，支持负索引与反转")
    show("nums[1:4]", nums[1:4])
    show("nums[::-1]  # 反转", nums[::-1])
    show("nums[-1]  # 最后一个", nums[-1])

    note("tuple：不可变，常用于多值返回与解包")
    point: tuple[int, int] = (10, 20)
    x, y = point  # 解包
    show("x, y = point", (x, y))
    first, *rest = nums  # 星号收集其余
    show("first, *rest", (first, rest))

    note("dict：哈希表，保留插入顺序；.get 带默认值避免 KeyError")
    scores: dict[str, int] = {"alice": 95, "bob": 82}
    scores["carol"] = 78
    show("scores.get('zoe', 0)", scores.get("zoe", 0))
    show("list(scores.items())", list(scores.items()))

    note("字典推导式：键值互转 / 批量变换")
    show("{k: v*2 for k,v in ...}", {k: v * 2 for k, v in scores.items()})

    note("set：自动去重，天然支持交并差")
    a = {1, 2, 2, 3, 3, 3}
    b = {2, 3, 4}
    show("{1,2,2,3,3,3}", a)
    show("交集 a & b", a & b)
    show("并集 a | b", a | b)
    show("差集 a - b", a - b)

    note("合并字典：| 运算符（3.9+）")
    base = {"host": "localhost", "port": 80}
    show("base | {'port': 443}", base | {"port": 443})
