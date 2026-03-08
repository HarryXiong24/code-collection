package main

import "fmt"

type BoundedBlockingQueue struct {
	channel chan int
}

func NewBoundedBlockingQueue(capacity int) *BoundedBlockingQueue {
	return &BoundedBlockingQueue{
		channel: make(chan int, capacity),
	}
}

func (q *BoundedBlockingQueue) Enqueue(value int) {
	select {
	case q.channel <- value:
	default:
	}
}

func (q *BoundedBlockingQueue) Dequeue() (int, bool) {
	val, ok := <-q.channel
	return val, ok
}

func (q *BoundedBlockingQueue) Close() {
	close(q.channel)
}

// test
func Test1() {
	queue := NewBoundedBlockingQueue(2)

	// 模拟生产者
	go func() {
		queue.Enqueue(100)
		queue.Enqueue(200)
		queue.Close()
	}()

	// 模拟消费者
	for {
		val, ok := queue.Dequeue()
		if !ok {
			fmt.Println("队列已关闭，消费结束")
			break
		}
		fmt.Printf("消费数据: %d\n", val)
	}
}

func main() {
	Test1()
}
