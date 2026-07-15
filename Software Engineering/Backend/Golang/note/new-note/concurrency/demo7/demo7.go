// Demo: 协程和管道协同工作
// 1. 开启一个 writeData 协程，向管道中写入 50 个整数.
// 2. 开启一个 readData 协程，从管道中读取 writeData 写入的数据
// 3. 注意: writeData 和 readDate 操作的是同一个管道
// 4. 主线程需要等待 writeData 和 readDate 协程都完成工作才能退出

package main

import (
	"fmt"
	"sync"
	"time"
)

func read(intChan chan int) {
	defer wg.Done()
	for value := range intChan {
		fmt.Println("The read data is: ", value)
	}
}

func write(intChan chan int) {
	defer wg.Done()
	for i := 1; i <= 50; i++ {
		intChan <- i
		fmt.Println("The write data is: ", i)
		time.Sleep(time.Second) // 为了演示效果好
	}

	close(intChan)
}

var wg sync.WaitGroup

func main() {
	intChan := make(chan int, 50)

	// 开启读和写的协程
	wg.Add(2)
	go write(intChan)
	go read(intChan)

	wg.Wait()
}
