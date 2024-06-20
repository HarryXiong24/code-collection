"""
File: linkedqueue.py
"""

from node import Node
from abstractcollection import AbstractCollection

class LinkedQueue(AbstractCollection):
    """front执行队头, rear指向队尾"""
    def __init__(self, source_collection=None):
        self._items = None
        AbstractCollection.__init__(self, source_collection)


    def __iter__(self):
        """迭代"""
        if self.isEmpty():
            return []
        else:
            probe = self._front
            while probe != None:
                yield probe.data
                probe = probe.next

    def peek(self):
        """查看队列头部"""
        if self.isEmpty():
            raise KeyError("The queue is empty.")
        return self._front.data

    def clear(self):
        """清空队列"""
        self._front = None
        self._size = 0

    def add(self, item):
        new_node = Node(item, None)
        if self.isEmpty():
            self._front = new_node
        else:
            self._rear.next = new_node
        self._rear = new_node
        self._size += 1

    def pop(self):
        if self.isEmpty():
            raise KeyError("The queue is empty.")
        old_item = self._front.data
        self._front = self._front.next
        if self._front == None:
            self._rear = None
        self._size -= 1
        return old_item
