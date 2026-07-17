# Python

Python 语言用法演示（Python 3.12+）。每个 demo 打印出「表达式 → 结果」，跑一遍就能看到语言特性的真实行为，不用去背文档。

与同目录的 [`../TypeScript`](../TypeScript)、[`../Go`](../Go)、[`../Rust`](../Rust) 是**同一套主题、逐一对应**的四份实现，方便横向对比这几种强类型语言的写法差异。

## 跑起来

```bash
python main.py                  # 跑全部 15 个 demo
python main.py generics async   # 只跑指定的几个
python -m unittest              # 跑单元测试（见 tests/test_demos.py）
```

需要 Python ≥ 3.12（用到 PEP 695 泛型语法 `def f[T]`、`type` 语句、`@override`）。无第三方依赖。

> 全程是 **Python 3**。项目里所有 `print` 都是函数、除法 `/` 是真除法、字符串默认 Unicode —— 不涉及任何 Python 2 写法。

## 内容

| # | 文件 | 名字 | 重点 |
| --- | --- | --- | --- |
| 01 | `demos/d01_types.py` | `types` | 动态类型 + 类型注解、`int` 任意精度、`None`、转换、f-string |
| 02 | `demos/d02_collections.py` | `collections` | `list`/`tuple`/`dict`/`set`、推导式、切片、解包 |
| 03 | `demos/d03_functions.py` | `functions` | 默认参数、`*args`/`**kwargs`、仅关键字参数、闭包、`Callable` |
| 04 | `demos/d04_control_flow.py` | `control-flow` | `for-else`、`enumerate`/`zip`、`match` 结构化模式匹配、真值 |
| 05 | `demos/d05_classes.py` | `classes` | `@dataclass`、`@property`、继承、`Protocol` 结构化子类型、`@override` |
| 06 | `demos/d06_generics.py` | `generics` | PEP 695 泛型 `def f[T]` / `class Stack[T]`、有界类型参数 |
| 07 | `demos/d07_errors.py` | `errors` | `try/except/else/finally`、自定义异常、`raise from`、`with` |
| 08 | `demos/d08_async.py` | `async` | `asyncio`、`gather`、`TaskGroup`、`wait_for` 超时 |
| 09 | `demos/d09_advanced_types.py` | `advanced-types` | `Literal`、`Enum`、`TypedDict`、`type` 别名、`isinstance` 收窄 |
| 10 | `demos/d10_decorators.py` | `decorators` | 装饰器、`functools.wraps`、带参装饰器、`@lru_cache` |
| 11 | `demos/d11_memory.py` | `memory` | 引用语义、可变/不可变、`is` vs `==`、可变默认参数坑、`deepcopy` |
| 12 | `demos/d12_stdlib.py` | `stdlib` | `json`、`datetime`、`pathlib`、`collections`、`itertools` |
| 13 | `demos/d13_iterators.py` | `iterators` | 生成器 `yield`、生成器表达式、惰性无限序列、`__iter__`、`yield from` |
| 14 | `demos/d14_modules.py` + `mathlib.py` | `modules` | `import` 各写法、`__all__`、下划线约定、`__name__` / `__main__` |
| 15 | `demos/d15_sorting_equality.py` | `sorting` | `key=` 多键排序、稳定性、`frozen dataclass` 判等/哈希、`@total_ordering` |
| 16 | `tests/test_demos.py` | — | 内置 `unittest`，`subTest` 表驱动（用 `python -m unittest` 跑） |

## 类型系统要点（Python 的取舍）

- **动态类型 + 渐进式类型注解**：注解在**运行时不强制**，靠 `mypy` / `pyright` 静态检查兜底。这点和 TypeScript 的「编译期擦除」很像，但 Python 连编译步骤都没有 —— 注解纯粹是给工具和读者的。
- **`Protocol` = 结构化子类型**：有对应方法就算实现，无需显式继承（见 `05`）。对应 Go 的隐式接口、TS 的结构化 `interface`。
- **一切皆对象、变量是引用**：理解「可变 vs 不可变」和 `is`/`==` 的区别是绕开一整类 bug 的关键（见 `11`）。
- **PEP 695 新泛型语法（3.12+）**：`def first[T](xs: list[T]) -> T | None` 直接写类型参数，不用再 `TypeVar`（见 `06`）。

## 工具链

| 用途 | 工具 |
| --- | --- |
| 版本 / 虚拟环境 | `python -m venv .venv`，或 `uv` / `pyenv` |
| 依赖管理 | `pip` + `pyproject.toml`，现代方案 `uv` / `poetry` |
| 类型检查 | `mypy` / `pyright`（配置见 `pyproject.toml` 的 `[tool.mypy]`） |
| 测试 | 内置 `unittest`（本项目）、或 `pytest` |
| Lint / 格式化 | `ruff`（一个工具搞定 lint + format） |
