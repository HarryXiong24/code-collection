"""
File: linkedlist.py
"""


from node import DoubleNode
from abstractlist import AbstractList
from linkedlistiterator import LinkedListIterator
import copy

class LinkedList(AbstractList):
    """基于双向循环链表实现列表"""

    def __init__(self, source_collection=None):
        # head 指向哨兵节点, 而不是数据节点,
        self._head = DoubleNode()
        self._head.previous = self._head
        AbstractList.__init__(self, source_collection)

    def __iter__(self):
        """迭代"""
        if self.isEmpty():
            return []
        # cursor指向第一个数据节点
        cursor = self._head.next
        while cursor != self._head:
            yield cursor.data
            cursor = cursor.next

    def _get_node(self, i):
        """返回索引为i 的节点"""
        if i == len(self):
            return self._head
        if i == len(self) - 1:
            return self._head.previous
        probe = self._head.next
        while i > 0:
            probe = probe.next
            i -= 1
        return probe

    def __setitem__(self, i, item):
        """重新赋值i 节点"""
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        self._get_node(i).data = item

    def __getitem__(self, i):
        """返回i 节点的值"""
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        return self._get_node(i).data

    def insert(self, i, item):
        """插入"""
        if i < 0:
            i = 0
        elif i > len(self):
            i = len(self)
        the_node = self._get_node(i)
        new_node = DoubleNode(item, the_node.previous, the_node)
        the_node.previous.next = new_node
        the_node.previous = new_node
        self._size += 1

    def pop(self, i):
        """删除i 位置"""
        if i < 0 or i >= len(self):
            raise IndexError("List index out of range.")
        the_node = self._get_node(i)
        the_node.next.previous = the_node.previous
        the_node.previous.next = the_node.next
        return the_node.data

    def list_iterator(self):
        """返回列表迭代器"""
        return LinkedListIterator(self)

