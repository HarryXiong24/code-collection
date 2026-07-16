package main

import (
	"fmt"
	"time"
)

func main() {
	// 定义一个int管道
	intChan := make(chan int, 1)
	go func() {
		time.Sleep(time.Second * 5)
		intChan <- 10
	}()

	// 定义一个 string 管道
	stringChan := make(chan string, 1)
	go func() {
		time.Sleep(time.Second * 2)
		stringChan <- "msbgolang"
	}()

	// 阻塞发生的原因在于 Go 中的通道（channel）在没有数据可读取或者无法发送数据时，默认情况下会让 Goroutine 进入等待状态，导致代码暂停执行，直到条件满足为止。这种行为称为 阻塞。
	// 如果 intChan 是空的，程序会在此行阻塞，等待通道中有数据被发送。
	// fmt.Println(<-intchan)

	select {
	case v := <-intChan:
		fmt.Println("intChan:", v)
	case v := <-stringChan:
		fmt.Println("stringchan:", v)
	default:
		fmt.Println("no data and we can do other thing")
		time.Sleep(time.Second) // 模拟做其他事，防止快速循环

	}
}
