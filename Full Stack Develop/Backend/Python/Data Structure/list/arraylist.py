""""
File: arraylist.py
"""

from arrays import Array
from abstractlist import AbstractList
from arraylistiterator import ArrayListIterator

class ArrayList(AbstractList):
    """基于数组实现列表"""

    DEFAULT_CAPACITY = 10

    def __init__(self, source_collection=None):
        self._items = Array(ArrayList.DEFAULT_CAPACITY)
        AbstractList.__init__(self, source_collection)

    def __iter__(self):
        """迭代"""
        cursor = 0
        while cursor < len(self):
            yield self._items[cursor]
            cursor += 1

    def __getitem__(self, i):
        """获取i 位置的元素"""
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        return self._items[i]

    def __setitem__(self, i, item):
        """修改操作"""
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        self._items[i] = item

    def insert(self, i, item):
        """在i 位置插入item"""
        if i < 0:
            i = 0
        elif i > len(self):
            i = len(self)
        if i < len(self):
            # 将数组元素从右往左, 依次后移
            for j in range(len(self), i, -1):
                self._items[j] = self._items[j - 1]
        self._items[i] = item
        self._size += 1
        self.inc_mod_count()

    def pop(self, i=None):
        """删除i 位置元素"""
        if i == None:
            i = len(self) - 1
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        item = self._items[i]
        # 从左往右，移动元素
        for j in range(i, len(self) - 1):
            self._items[j] = self._items[j + 1]
        self._size -= 1
        self.inc_mod_count()
        return item

    def list_iterator(self):
        """返回列表迭代器"""
        return ArrayListIterator(self)

