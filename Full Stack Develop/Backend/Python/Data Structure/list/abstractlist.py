"""
File: abstractlist.py
"""

from abstractcollection import AbstractCollection
class AbstractList(AbstractCollection):
    """抽象列表的实现"""

    def __init__(self, source_collection):
        self._mod_count = 0
        AbstractCollection.__init__(self, source_collection)

    def get_mod_count(self):
        """返回修改计数"""
        return self._mod_count

    def inc_mod_count(self):
        """增加修改计数"""
        self._mod_count += 1

    def index(self, item):
        """查找指定item 的索引"""
        position = 0
        for data in self:
            if data == item:
                return position
            else:
                position += 1
        if position == len(self):
            return ValueError(str(item) + " not in list.")

    def add(self, item):
        """增加元素"""
        self.insert(len(self), item)

    def remove(self, item):
        """删除"""
        position = self.index(item)
        self.pop(position)

