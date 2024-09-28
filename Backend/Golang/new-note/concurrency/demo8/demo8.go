// 声明只读只写

package main

import "fmt"

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
