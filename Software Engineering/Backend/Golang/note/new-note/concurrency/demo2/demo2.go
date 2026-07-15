// 主线程结束，所有协程都会结束

// 验证主死从随

package main

import (
	"fmt"
	"strconv"
	"time"
)

func test() {
	// 本来要执行 1000 次，但是主线程在 10 次就结束了，所以协程只能执行大约 10 次
	for i := 1; i <= 1000; i++ {
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
