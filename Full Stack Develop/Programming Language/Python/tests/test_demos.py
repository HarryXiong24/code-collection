"""13 Testing — uses the standard-library unittest, zero third-party dependencies.

Run:
    python -m unittest              auto-discover cases under tests/
    python -m unittest -v           show each case

Key points:
  1. Test classes inherit unittest.TestCase, and methods start with test_.
  2. Assertion methods like self.assertEqual / assertRaises are all available.
  3. subTest implements "table-driven" tests: one loop covers multiple inputs, each failure reported independently.
  4. The community also commonly uses pytest (more concise assert syntax) — here we use the built-in unittest.
"""

import unittest

from demos.mathx import classify, divide


class TestClassify(unittest.TestCase):
    def test_classify(self) -> None:
        cases = [(-5, "negative"), (0, "zero"), (42, "positive")]
        for n, expected in cases:
            with self.subTest(n=n):  # table-driven: each input reported independently
                self.assertEqual(classify(n), expected)


class TestDivide(unittest.TestCase):
    def test_normal(self) -> None:
        self.assertEqual(divide(10, 2), 5)

    def test_divide_by_zero(self) -> None:
        with self.assertRaises(ZeroDivisionError):
            divide(1, 0)


if __name__ == "__main__":
    unittest.main()
