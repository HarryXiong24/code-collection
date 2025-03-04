// 声明只读只写

package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	// 可读可写
	// intChan := make(chan int, 50)

	// 声明为只写:
	var intChan2 chan<- int // 管道具备 <- 只写性质
	intChan2 = make(chan int, 3)
	intChan2 <- 20
	// num := <-intChan2
	// fmt.Println("intchan2:", num) // cannot receive from send-only channel intChan2 (variable of type chan<- int)

	// 声明为只读:
	var intChan3 <-chan int
	if intChan3 != nil {
		num1 := <-intChan3
		fmt.Println(num1)
	}
	// intChan3 <- 20 // cannot send to receive-only channel intChan3 (variable of type <-chan int)
}

// 在 Go 语言中，一个可读可写的通道（chan T）可以作为 <-chan T（只读通道）传入函数，Go 语言会自动进行类型转换（隐式转换）。

// 任务生产者
func taskProducer(taskChan chan<- string) {
	for i := 1; i <= 3; i++ {
		task := fmt.Sprintf("Task-%d", i)
		fmt.Println("Producing:", task)
		taskChan <- task
		time.Sleep(time.Second) // 模拟任务创建延迟
	}
	close(taskChan) // 关闭通道，防止消费者死锁
}

// 任务消费者
func taskConsumer(taskChan <-chan string, wg *sync.WaitGroup) {
	defer wg.Done()
	for task := range taskChan {
		fmt.Println("Processing:", task)
		time.Sleep(time.Second * 2) // 模拟任务处理时间
	}
}

func demo() {
	taskChan := make(chan string, 3)
	var wg sync.WaitGroup

	// 生产任务
	go taskProducer(taskChan)

	// 启动多个消费者
	for i := 1; i <= 2; i++ {
		wg.Add(1)
		go taskConsumer(taskChan, &wg)
	}

	wg.Wait()
	fmt.Println("All tasks processed.")
}
