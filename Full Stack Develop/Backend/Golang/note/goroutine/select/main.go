package main

import (
	"fmt"
	"sync"
)

func main() {
	redEnvelopes := make(chan int, 3) // 红包池

	go func() {
		// 塞入3个红包
		redEnvelopes <- 50
		redEnvelopes <- 100
		redEnvelopes <- 20
		close(redEnvelopes) // 发放完毕
	}()

	var wg sync.WaitGroup

	for i := 1; i <= 10; i++ {
		wg.Add(1)
		go func(userId int) {
			defer wg.Done()

			// 尝试抢红包
			select {
			case money, ok := <-redEnvelopes:
				if ok {
					fmt.Printf("用户 [%d] 抢到了 %d 元！\n", userId, money)
				}
			default: // 如果 redEnvelopes 拿不到东西，立刻走这里
				fmt.Printf("用户 [%d] 手慢了，没抢到...\n", userId)
			}
		}(i)
	}

	wg.Wait()
}
