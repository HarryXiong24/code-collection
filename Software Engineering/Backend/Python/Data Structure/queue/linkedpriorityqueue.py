"""
File: linkedpriorityqueue.py
"""

from node import Node
from linkedqueue import LinkedQueue

class LinkedPriorityQueue(LinkedQueue):
    """优先级队列"""

    def __init__(self, source_collection=None):
        LinkedQueue.__init__(self, source_collection)

    def add(self, new_item):
        """重写超类的add方法"""
        if self.isEmpty() or new_item >= self._rear.data:
            # 添加到队尾
            LinkedQueue.add(self, new_item)
        else:
            # 遍历队列, 根据优先级插入
            probe = self._front
            while new_item >= probe.data:
                tailer = probe # 当前probe节点的上一个节点
                probe = probe.next
            new_node = Node(new_item, probe)
            if probe == self._front:
                # 只有一个节点
                self._front = new_node
            else:
                # 多个节点
                tailer.next = new_node
            self._size += 1
