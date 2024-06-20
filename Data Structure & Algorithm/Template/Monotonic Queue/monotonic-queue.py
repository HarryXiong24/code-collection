class MonotonicQueue:
    def __init__(self):
        self.queue = []

    def push(self, value: int):
        while self.queue and self.queue[-1] < value:
            self.queue.pop()
        self.queue.append(value)

    def pop(self):
        if self.queue:
            self.queue.pop(0)

    def get_max(self):
        return self.queue[0] if self.queue else None

    def size(self):
        return len(self.queue)

    def is_empty(self):
        return len(self.queue) == 0


# test
mq = MonotonicQueue()
mq.push(3)
mq.push(1)
mq.push(4)
mq.push(2)

print(mq.get_max())  # 输出: 4
mq.pop()
print(mq.get_max())  # 输出: 4
mq.pop()
