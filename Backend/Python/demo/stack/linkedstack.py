"""
linkedstack.py
"""

from node import Node
from abstractstack import AbstractStack

class LinkedStack(AbstractStack):
    """基于单链表实现栈-链表头部为栈顶"""

    def __init__(self, source_collection=None):
        self._items = None
        AbstractStack.__init__(self, source_collection)

    def __iter__(self):
        """迭代-使用一个列表实现, 列表第一项为单链表的最后一项"""
        def visit_nodes(node):
            if node != None:
                visit_nodes(node.next)
                temp_list.append(node.data)
        temp_list = []
        visit_nodes(self._items)
        return iter(temp_list)

    def peek(self):
        """返回栈顶元素"""
        self._prior_condition()
        return self._items.data

    def clear(self):
        """清空列表"""
        self._size = 0
        self._items = None

    def push(self, item):
        """入栈"""
        self._items = Node(item, self._items)
        self._size += 1

    def pop(self):
        """出栈"""
        self._prior_condition()
        old_item = self._items.data
        self._items = self._items.next
        self._size -= 1
        return old_item

    def _prior_condition(self):
        if self._size == 0:
            raise KeyError("The stack is empty.")
