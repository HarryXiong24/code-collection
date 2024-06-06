from typing import List


class MonotonicQueue:

    def __init__(self) -> None:
        self.queue: List[int] = []

    def push(self, value: int):
        while len(self.queue) and self.queue[len(self.queue) - 1] < value:
            self.queue.pop()
        self.queue.append(value)

    def pop(self):
        if len(self.queue):
            self.queue.pop(0)

    def getMax(self):
        return self.queue[0]

    def size(self):
        return len(self.queue)

    def isEmpty(self):
        return len(self.queue) == 0


# test
mq = MonotonicQueue()
mq.push(3)
mq.push(1)
mq.push(4)
mq.push(2)
mq.push(1)
print(mq.queue)
