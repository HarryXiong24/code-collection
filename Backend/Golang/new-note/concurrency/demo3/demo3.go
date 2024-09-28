// 启动多个协程

package main

import (
	"fmt"
	"time"
)

func test(n int) {
	fmt.Println(n)
}

// 主线程
func main() {

	// 开启多个协程
	for i := 1; i <= 5; i++ {
		go test(i)
	}

	time.Sleep(time.Second * 3)
}
