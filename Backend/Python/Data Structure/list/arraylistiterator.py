"""
File: arraylistiterator.py
"""


class ArrayListIterator(object):
    """基于数组的列表迭代器"""

    def __init__(self, backing_store):
        # backing_store 和 mod_count 都是array_list的同一个对象(浅拷贝)
        self._backing_store = backing_store
        self._mod_count = backing_store.get_mod_count()
        self.first()

    def first(self):
        """将cursor 重置为开头"""
        self._cursor = 0
        # 调用next 或 previous 前指向的节点位置的参数，默认值=-1
        # 改参数用于调用修改器方法时修改的位置索引
        self._last_item_pos = -1

    def has_next(self):
        """如果当前cursor之后还有元素返回True"""
        return self._cursor < len(self._backing_store)

    def next(self):
        """返回当前cursor的元素, 并且cursor 后移"""
        if self.has_next() == False:
            raise ValueError("No next item in list iterator.")
        if self._mod_count != self._backing_store.get_mod_count():
            raise AttributeError(
                "Illegal modification of backing store.")
        self._last_item_pos = self._cursor
        self._cursor += 1
        return self._backing_store[self._last_item_pos]

    def last(self):
        """将cursor 重置为末尾之后"""
        self._cursor = len(self._backing_store)
        self._last_item_pos = -1

    def has_previous(self):
        """如果当前cursor 之前还有元素返回True"""
        return self._cursor > 0

    def previous(self):
        """返回当前cursor 的前一个元素, 并且cursor 前移"""
        if self.has_previous() == False:
            raise ValueError("No previous item in list iterator.")
        if self._mod_count != self._backing_store.get_mod_count():
            raise AttributeError(
                "Illegal modification of backing store.")
        self._cursor -= 1
        self._last_item_pos = self._cursor
        return self._backing_store[self._last_item_pos]


    """3个修改器方法"""
    def replace(self, item):
        """替换最后一次修改的位置为 item"""
        if self._last_item_pos == -1:
            raise AttributeError(
                "The current position is undefined.")
        if self._mod_count != self._backing_store.get_mod_count():
            raise AttributeError(
                "List has been modified illegally.")
        self._backing_store[self._last_item_pos] = item
        self._last_item_pos = -1

    def insert(self, item):
        """在最后修改的位置插入 item"""
        if self._mod_count != self._backing_store.get_mod_count():
            raise AttributeError(
                "List has been modified illegally.")
        # 没有调用next或previous 默认添加到末尾
        if self._last_item_pos == -1:
            self._backing_store.add(item)
        else:
            self._backing_store.insert(self._last_item_pos, item)
        self._last_item_pos = -1
        self._mod_count += 1

    def remove(self):
        """删除最后修改的位置"""
        if self._last_item_pos == -1:
            raise AttributeError(
                "The current position is undefined.")
        if self._mod_count != self._backing_store.get_mod_count():
            raise AttributeError(
                "List has been modified illegally.")
        item = self._backing_store.pop(self._last_item_pos)
        # 如果之前调用的是next，代表cursor > last_item_pos
        # 所以当删除last_item_pos 位置后，cursor 需要 -1
        if self._last_item_pos < self._cursor:
            self._cursor -= 1
        self._mod_count += 1
        self._last_item_pos = -1
