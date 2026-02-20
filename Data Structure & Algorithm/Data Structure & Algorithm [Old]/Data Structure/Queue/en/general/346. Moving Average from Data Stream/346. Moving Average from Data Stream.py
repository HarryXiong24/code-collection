# 346. Moving Average from Data Stream

# Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

# Implement the MovingAverage class:

# MovingAverage(int size) Initializes the object with the size of the window size.
# double next(int val) Returns the moving average of the last size values of the stream.

# Example 1:
# Input
# ["MovingAverage", "next", "next", "next", "next"]
# [[3], [1], [10], [3], [5]]
# Output
# [null, 1.0, 5.5, 4.66667, 6.0]
# Explanation
# MovingAverage movingAverage = new MovingAverage(3);
# movingAverage.next(1); // return 1.0 = 1 / 1
# movingAverage.next(10); // return 5.5 = (1 + 10) / 2
# movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
# movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

class MovingAverage:

    def __init__(self, size: int):
        self.window_size = size
        self.queue = []

    def next(self, val: int) -> float:
        self.queue.append(val)
        if len(self.queue) <= self.window_size:
            total = 0
            for item in self.queue:
                total = total + item
            return total / len(self.queue)
        while len(self.queue) > self.window_size:
            self.queue.pop(0)
        total = 0
        for item in self.queue:
            total = total + item
        return total / self.window_size
