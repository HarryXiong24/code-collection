"""
arraystack.py
"""

from arrays import Array
from abstractstack import AbstractStack


class ArrayStack(AbstractStack):
    """基于数组的栈-从左到右为栈底、栈顶"""
    # 默认数组大小
    DEFAULT_CAPACITY = 10

    def __init__(self, source_collection=None):
        self._items = Array(ArrayStack.DEFAULT_CAPACITY)
        AbstractStack.__init__(self, source_collection)

    def __iter__(self):
        """迭代"""
        cursor = 0
        while cursor < len(self):
            yield self._items[cursor]
            cursor += 1

    def peek(self):
        """查看栈顶元素"""
        self._prior_condition()
        return self._items[len(self) - 1]

    def clear(self):
        """清空栈"""
        self._size = 0
        self._items = Array(ArrayStack.DEFAULT_CAPACITY)

    def push(self, item):
        """入栈"""
        self._items[len(self)] = item
        self._size += 1

    def pop(self):
        """出栈"""
        self._prior_condition()
        old_item = self._items[len(self) - 1]
        self._size -= 1
        return old_item

    def _prior_condition(self):
        if self._size == 0:
            raise KeyError("The stack is empty.")









