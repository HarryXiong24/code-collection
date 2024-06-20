package main

import (
	"fmt"
)

// MonotonicQueue represents a queue that maintains its elements in a monotonically decreasing order.
type MonotonicQueue struct {
	queue []int
}

// NewMonotonicQueue initializes a new MonotonicQueue.
func NewMonotonicQueue() *MonotonicQueue {
	return &MonotonicQueue{queue: []int{}}
}

// Push adds a new value to the queue while maintaining the monotonic property.
func (mq *MonotonicQueue) Push(value int) {
	for len(mq.queue) > 0 && mq.queue[len(mq.queue)-1] < value {
		mq.queue = mq.queue[:len(mq.queue)-1]
	}
	mq.queue = append(mq.queue, value)
}

// Pop removes the front element of the queue.
func (mq *MonotonicQueue) Pop() {
	if len(mq.queue) > 0 {
		mq.queue = mq.queue[1:]
	}
}

// GetMax returns the maximum element in the queue.
func (mq *MonotonicQueue) GetMax() (int, bool) {
	if len(mq.queue) > 0 {
		return mq.queue[0], true
	}
	return 0, false
}

// Size returns the number of elements in the queue.
func (mq *MonotonicQueue) Size() int {
	return len(mq.queue)
}

// IsEmpty checks if the queue is empty.
func (mq *MonotonicQueue) IsEmpty() bool {
	return len(mq.queue) == 0
}

func main() {
	mq := NewMonotonicQueue()
	mq.Push(3)
	mq.Push(1)
	mq.Push(4)
	mq.Push(2)

	max, _ := mq.GetMax()
	fmt.Println(max) // 输出: 4
	mq.Pop()
	max, _ = mq.GetMax()
	fmt.Println(max) // 输出: 4
	mq.Pop()
}