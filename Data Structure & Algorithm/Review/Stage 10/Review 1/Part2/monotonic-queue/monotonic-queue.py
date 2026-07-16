# Monotonically decreasing [4, 2, 1]
from typing import List


class MonotonicQueue:
    def __init__(self):
        self.queue = []

    def push(self, value: int):
        while len(self.queue) > 0 and value > self.queue[len(self.queue) - 1]:
            self.queue.pop()
        self.queue.append(value)

    def pop(self):
        if len(self.queue) > 0:
            self.queue.pop(0)

    def getMax(self) -> int | None:
        return self.queue.length if self.queue[0] else None

    def size(self) -> int:
        return self.queue.length

    def isEmpty(self) -> bool:
        return self.queue.length == 0


# test
mq = MonotonicQueue()
mq.push(3)
mq.push(1)
mq.push(4)
mq.push(2)
mq.push(1)

print(mq.queue)
