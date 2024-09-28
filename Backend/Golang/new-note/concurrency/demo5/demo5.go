// 多个协程操作同一个全局数据

package main

import (
	"fmt"
	"sync"
	"time"
)

// func add(totalValue *int, wg *sync.WaitGroup) {
// 	defer wg.Done()
// 	for i := 1; i <= 10000; i++ {
// 		*totalValue += 1
// 	}
// }

// func minus(totalValue *int, wg *sync.WaitGroup) {
// 	defer wg.Done()
// 	for i := 1; i <= 10000; i++ {
// 		*totalValue -= 1
// 	}
// }

// // 主线程
// func main() {

// 	var wg sync.WaitGroup
// 	var totalValue int = 0

// 	wg.Add(2)

// 	go add(&totalValue, &wg)
// 	go minus(&totalValue, &wg)

// 	wg.Wait()
// 	fmt.Println(totalValue) // 不会等于 0, 因为会争抢资源，所以要加锁
// }

// 加入互斥锁
func add(totalValue *int, wg *sync.WaitGroup, lock *sync.Mutex) {
	defer wg.Done()
	for i := 1; i <= 10000; i++ {
		lock.Lock()
		*totalValue += 1
		lock.Unlock()
	}
}

func minus(totalValue *int, wg *sync.WaitGroup, lock *sync.Mutex) {
	defer wg.Done()
	for i := 1; i <= 10000; i++ {
		lock.Lock()
		*totalValue -= 1
		lock.Unlock()
	}
}

// 主线程
func main() {

	var wg sync.WaitGroup
	var lock sync.Mutex
	var totalValue int = 0

	wg.Add(2)

	go add(&totalValue, &wg, &lock)
	go minus(&totalValue, &wg, &lock)

	wg.Wait()
	fmt.Println(totalValue) // 加锁之后，就会等于 0

	// 场合: 读多写少
	var rwLock sync.RWMutex

	wg.Add(2)

	for i := 1; i <= 5; i++ {
		go read(&wg, &rwLock)
	}

	go write(&wg, &rwLock)
	wg.Wait()
}

func read(wg *sync.WaitGroup, lock *sync.RWMutex) {
	defer wg.Done()
	lock.RLock() // 读数据这个锁不会有影响，读写同时发生的时候，会有影响
	fmt.Println("begin to read data")
	time.Sleep(time.Second)
	fmt.Println("read data completed")
	lock.RUnlock()
}

func write(wg *sync.WaitGroup, lock *sync.RWMutex) {
	defer wg.Done()
	lock.Lock()
	fmt.Println("begin to write data")
	time.Sleep(time.Second * 10)
	fmt.Println("write data completed")
	lock.Unlock()
}

// 互斥锁： 当读和写操作的比例相当，或者写操作非常频繁时，使用互斥锁可以避免读写锁带来的性能损失。
// 读写锁：当读操作远多于写操作时，使用读写锁可以显著提高读操作的并发性能，因为多个读操作可以同时进行。
