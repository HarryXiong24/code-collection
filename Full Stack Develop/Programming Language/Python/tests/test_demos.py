"""13 测试 —— 用标准库 unittest，零第三方依赖。

运行：
    python -m unittest              自动发现 tests/ 下的用例
    python -m unittest -v           显示每个用例

要点：
  1. 测试类继承 unittest.TestCase，方法以 test_ 开头。
  2. self.assertEqual / assertRaises 等断言方法一应俱全。
  3. subTest 实现「表驱动」：一个循环覆盖多组输入，失败各自独立报告。
  4. 社区也常用 pytest（更简洁的 assert 语法）——这里用内置的 unittest。
"""

import unittest

from demos.mathx import classify, divide


class TestClassify(unittest.TestCase):
    def test_classify(self) -> None:
        cases = [(-5, "negative"), (0, "zero"), (42, "positive")]
        for n, expected in cases:
            with self.subTest(n=n):  # 表驱动：每组输入独立报告
                self.assertEqual(classify(n), expected)


class TestDivide(unittest.TestCase):
    def test_normal(self) -> None:
        self.assertEqual(divide(10, 2), 5)

    def test_divide_by_zero(self) -> None:
        with self.assertRaises(ZeroDivisionError):
            divide(1, 0)


if __name__ == "__main__":
    unittest.main()
