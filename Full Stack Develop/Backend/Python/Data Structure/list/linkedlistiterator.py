"""
File: linkedlistiterator.py
"""

from node import DoubleNode

class LinkedListIterator(object):
    """基于双向循环链表的列表迭代器"""

    def __init__(self, backing_sotre):
        # backing_store 和 mod_count 都是array_list的同一个对象(浅拷贝)
        self._backing_store = backing_sotre
        self._head = backing_sotre._head
        self.first()

    def first(self):
        """将cursor 重置为开头"""
        # cursor指向第一个数据节点
        self._cursor = self._head.next
        # 调用next 或 previous 前指向的节点位置
        self._last_item_pos = self._head

    def has_next(self):
        """如果当前cursor之后还有节点返回True"""
        return self._cursor != self._head

    def next(self):
        """返回当前cursor的节点, 并且cursor 后移"""
        if self.has_next() == False:
            raise ValueError("No next item in list iterator.")
        self._last_item_pos = self._cursor
        self._cursor = self._cursor.next
        return self._last_item_pos.data

    def last(self):
        """将cursor 重置为末尾之后"""
        self._cursor = self._head
        self._last_item_pos = self._head

    def has_previous(self):
        """如果当前cursor 之前还有节点返回True"""
        return self._cursor != self._head

    def previous(self):
        """返回当前cursor 的前一个节点, 并且cursor 前移"""
        if self.has_previous() == False:
            raise ValueError("No previous item in list iterator.")
        self._cursor = self._cursor.previous
        self._last_item_pos = self._cursor
        return self._last_item_pos.data

    """3个修改器方法"""
    def replace(self, item):
        """替换最后一次修改的位置为 item"""
        if self._last_item_pos == self._head:
            raise AttributeError(
                "The current position is undefined.")
        self._last_item_pos.data = item
        self._last_item_pos = self._head

    def insert(self, item):
        """在最后修改的位置插入 item"""
        new_node = DoubleNode(item, 
            self._last_item_pos.previous, self._last_item_pos)
        self._last_item_pos.previous.next = new_node
        self._last_item_pos.previous = new_node
        self._last_item_pos = self._head

    def remove(self):
        """删除最后修改的位置"""
        if self._last_item_pos == self._head:
            raise AttributeError(
                "The current position is undefined.")
        self._last_item_pos.previous.next = self._last_item_pos.next
        self._last_item_pos.next.previous = self._last_item_pos.previous
        self._last_item_pos = self._head