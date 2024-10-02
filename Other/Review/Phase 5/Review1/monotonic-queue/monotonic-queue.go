package main

import (
	"fmt"
)

// MonotonicQueue represents a queue that maintains a monotonic decreasing order
type MonotonicQueue struct {
	queue []int
}

// NewMonotonicQueue is a constructor for MonotonicQueue
func NewMonotonicQueue() *MonotonicQueue {
	return &MonotonicQueue{queue: []int{}}
}

// Push adds a value to the queue while maintaining a monotonically decreasing order
func (mq *MonotonicQueue) Push(value int) {
	for len(mq.queue) > 0 && mq.queue[len(mq.queue)-1] < value {
		mq.queue = mq.queue[:len(mq.queue)-1] // Pop the last element
	}
	mq.queue = append(mq.queue, value)
}

// Pop removes the first element from the queue (FIFO)
func (mq *MonotonicQueue) Pop() {
	if len(mq.queue) > 0 {
		mq.queue = mq.queue[1:]
	}
}

// GetMax returns the maximum element (the first one in the queue)
func (mq *MonotonicQueue) GetMax() *int {
	if len(mq.queue) > 0 {
		return &mq.queue[0]
	}
	return nil
}

// Size returns the number of elements in the queue
func (mq *MonotonicQueue) Size() int {
	return len(mq.queue)
}

// IsEmpty checks if the queue is empty
func (mq *MonotonicQueue) IsEmpty() bool {
	return len(mq.queue) == 0
}

func main() {
	mq := NewMonotonicQueue()
	mq.Push(3)
	mq.Push(1)
	mq.Push(4)
	mq.Push(2)
	mq.Push(1)

	// Print the queue
	fmt.Println("Queue:", mq.queue)

	// Test GetMax
	if max := mq.GetMax(); max != nil {
		fmt.Println("Max:", *max)
	} else {
		fmt.Println("Queue is empty.")
	}

	// Test Pop
	mq.Pop()
	fmt.Println("Queue after Pop:", mq.queue)

	// Test Size and IsEmpty
	fmt.Println("Queue size:", mq.Size())
	fmt.Println("Is Queue empty?", mq.IsEmpty())
}
