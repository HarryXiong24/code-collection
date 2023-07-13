"""
arrayqueue.py
"""

from arrays import Array
from abstractcollection import AbstractCollection

class ArrayQueue(AbstractCollection):
    """
    基于循环数组的队列
    front-队头
    rear-队尾
    """
    # 默认数组大小
    DEFAULT_CAPACITY = 6

    def __init__(self, source_collection=None):
        self._items = Array(ArrayQueue.DEFAULT_CAPACITY)
        # 默认空队列值为0
        self._front = 0
        self._rear = 0
        AbstractCollection.__init__(self, source_collection)
        # 实例化对象时初始值, 则更改rear的值
        if source_collection != None:
            if type(source_collection) == int:
                self._rear = 0
            else:
                self._rear = len(source_collection) - 1

    def __iter__(self):
        """迭代"""
        if self.isEmpty():
            return []
        cursor = self._front
        if self._front <= self._rear: # rear在front之后
            while cursor <= self._rear:
                yield self._items[cursor]
                cursor += 1
                #print(cursor)
        else: 
            # 更加高阶的实现是使用求于, 
            # 这里使用简单点的:先遍历到数组末尾,然后返回到数组开头继续遍历
            while cursor <= self.DEFAULT_CAPACITY - 1:
                yield self._items[cursor]
                cursor += 1
            cursor = 0 # 返回到下标为0的位置
            while cursor <= self._rear:
                yield self._items[cursor]
                cursor += 1

    def peek(self):
        """查看队头元素"""
        self._prior_condition()
        return self._items[self._front]

    def clear(self):
        """清空队列"""
        self._size = 0
        self._items = Array(ArrayQueue.DEFAULT_CAPACITY)
        self._front = 0
        self._rear = 0

    def is_full(self):
        if self._size == ArrayQueue.DEFAULT_CAPACITY:
            return True
        else:
            return False

    def add(self, item):
        """入队列"""
        if self.is_full():
            raise KeyError("The queue is full")
        else:
            if self.isEmpty(): # 初始化时rear=0
                self._items[self._rear] = item
            else:
                index = (self._rear + 1) % self.DEFAULT_CAPACITY
                self._items[index] = item
                self._rear = index
            self._size += 1

    def pop(self):
        """出队列"""
        self._prior_condition()
        old_item = self._items[self._front]
        self._front = (self._front + 1) % self.DEFAULT_CAPACITY
        self._size -= 1
        return old_item

    def _prior_condition(self):
        if self._size == 0:
            raise KeyError("The queue is empty")
