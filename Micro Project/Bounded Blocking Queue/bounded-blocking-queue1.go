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
	// 注意：如果 q.channel 已被关闭，这里会触发 Panic
	// 按照 Go 的设计，生产者应该确保在关闭前停止发送
	q.channel <- value
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
		queue.Close() // 生产完了，主动关闭
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
