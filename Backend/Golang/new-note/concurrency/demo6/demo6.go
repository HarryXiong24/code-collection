// 管道本质就是一个数据结构 - 队列
// 数据是先进先出
// 自身线程安全，多协程访问时，不需要加锁，channel 本身就是线程安全的
// 管道有类型的，一个 string 的管道只能存放 string 类型数据

package main

import (
	"fmt"
	"strconv"
)

// var 变量名 chan 数据类型
// 1: chan 管道关键字
// 2: 数据类型指的是管道的类型，里面放入数据的类型，管道是有类型的，int 类型的管道只能写入整数 int
// 3: 管道是引用类型，必须初始化术能写入数据，即 make 后才能使用

func main() {
	// 定义管道、声明管道 ---> 定义一个int类型的管道
	// var intChan chan int
	// 通过 make 初始化: 管道可以存放 3 个 int 类型的数据
	intChan := make(chan int, 3)
	// 证明管道是引用类型:
	fmt.Printf("intchan 的值: %v\n", intChan) // 0xc000112080

	// 向管道存放数据:
	intChan <- 10
	num := 20
	intChan <- num
	intChan <- 40
	// 注意:不能存放大于容量的数据:
	// intChan <- 80

	// 在管道中读取数据
	num1 := <-intChan
	num2 := <-intChan
	num3 := <-intChan
	fmt.Println(num1)
	fmt.Println(num2)
	fmt.Println(num3)

	// 注意: 在没有使用协程的情况下，如果管道的数据已经全部取出，那么再取就会报错:
	// num4 := <-intChan
	// fmt.Println(num4)

	// 管道的关闭，关闭后就不能写数据了，只能读数据
	close(intChan)

	// test 再次写入
	// intChan <- 30 // panic: send on closed channel

	// 输出管道的长度:
	fmt.Printf("管道的实际长度: %v, 管道的容量是: %v\n", len(intChan), cap(intChan))

	// 管道的遍历
	strChan := make(chan string, 3)
	for i := 1; i <= 3; i++ {
		strChan <- strconv.Itoa(i) + "str"
	}

	close(strChan)

	// 在遍历前，如果没有关闭管道，就会出现 deadlock 的错误
	// 所以我们在遍历前要进行管道的关闭
	for value := range strChan {
		fmt.Println(value)
	}
}
