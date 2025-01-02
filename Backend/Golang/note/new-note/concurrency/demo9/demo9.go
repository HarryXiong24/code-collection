// 管道的阻塞
// 当这个管道只写入数据，不读，就会发生阻塞
// 阻塞发生的原因在于 Go 中的通道（channel）在没有数据可读取或者无法发送数据时，默认情况下会让 Goroutine 进入等待状态，导致代码暂停执行，直到条件满足为止。这种行为称为 阻塞。

// 写的快，读的慢，不会发生阻塞

package main

import (
	"fmt"
	"sync"
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
