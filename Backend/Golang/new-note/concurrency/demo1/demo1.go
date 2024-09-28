// 1. 在主线程中，开启一个goroutine，该goroutine每隔1秒输出 "hello golang"
// 2. 在主线程中也每隔一秒输出"hello msb"，输出10次后，退出程序
// 3. 要求主线程和 goroutine 同时执行

package main

import (
	"fmt"
	"strconv"
	"time"
)

func test() {
	for i := 1; i <= 10; i++ {
		fmt.Println("hello golang +" + strconv.Itoa(i))
		// 阻塞一秒
		time.Sleep(time.Second)
	}
}

// 主线程
func main() {
	// 开启一个协程
	go test()

	for i := 1; i <= 10; i++ {
		fmt.Println("hello msb +" + strconv.Itoa(i))
		// 阻塞一秒
		time.Sleep(time.Second)
	}
}
