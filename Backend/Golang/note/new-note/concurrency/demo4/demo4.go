// waitGroup 控制协程

package main

import (
	"fmt"
	"sync"
)

func test(n int) {
	defer wg.Done()
	fmt.Println(n)
}

var wg sync.WaitGroup

// 主线程
func main() {

	// 开启多个协程
	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go test(i)
	}

	wg.Wait()
}
