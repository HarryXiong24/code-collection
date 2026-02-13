package main

import (
	"fmt"
	"sync"
)

type BoundedBlockingQueueLock struct {
	capacity  int
	queue     []int
	lock      sync.Mutex
	fullWait  *sync.Cond
	emptyWait *sync.Cond
	closed    bool
}

func NewBoundedBlockingQueueLock(capacity int) *BoundedBlockingQueueLock {
	q := &BoundedBlockingQueueLock{
		capacity: capacity,
		queue:    make([]int, 0, capacity),
		lock:     sync.Mutex{},
		closed:   false,
	}
	// sync.Cond 需要绑定一个 Locker
	q.fullWait = sync.NewCond(&q.lock)
	q.emptyWait = sync.NewCond(&q.lock)

	return q
}

func (q *BoundedBlockingQueueLock) Enqueue(value int) bool {
	q.lock.Lock()
	defer q.lock.Unlock()

	if q.closed {
		return false
	}

	for len(q.queue) == q.capacity {
		q.fullWait.Wait()
		if q.closed {
			return false
		}
	}

	q.queue = append(q.queue, value)

	q.emptyWait.Signal()

	return true
}

func (q *BoundedBlockingQueueLock) Dequeue() (int, bool) {
	q.lock.Lock()
	defer q.lock.Unlock()

	for len(q.queue) == 0 {
		q.emptyWait.Wait()
	}

	if len(q.queue) == 0 && q.closed {
		return -1, false
	}

	val := q.queue[0]
	q.queue = q.queue[1:]

	q.fullWait.Signal()

	return val, true

}

func (q *BoundedBlockingQueueLock) Close() {
	q.lock.Lock()
	defer q.lock.Unlock()

	q.closed = true
	// 使用 Broadcast 唤醒所有正在 Wait 的 Goroutine
	q.fullWait.Broadcast()
	q.emptyWait.Broadcast()
}

// test
func main() {
	queue := NewBoundedBlockingQueueLock(2)

	// 模拟生产者
	go func() {
		queue.Enqueue(100)
		queue.Enqueue(200)
		queue.Close()
	}()

	fmt.Println(queue.Dequeue())
	fmt.Println(queue.Dequeue())
	// fmt.Println(queue.Dequeue())
}
