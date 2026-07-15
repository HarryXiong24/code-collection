package main

import "fmt"

// func main() {
// 	defer func() {
// 		fmt.Print(recover()) // 捕获 1
// 	}()
// 	defer func() {
// 		defer fmt.Print(recover()) // 捕获 2
// 		panic(1)
// 	}()
// 	defer recover() // 无效
// 	panic(2)
// }

func main() {
	defer func() {
		fmt.Print(recover())
	}()
	defer func() {
		defer func() {
			fmt.Print(recover())
		}()
		panic(1)
	}()
	defer recover() // 无效
	panic(2)
}

// 执行 panic(2)：
// 第三个 defer recover() 被跳过，因为 recover() 返回值未被处理，且它本身不是一个函数调用体内的 recover。
// 此时的 panic 为 2，开始进入清理 defer 队列。
// 执行第二个 defer func()：
// 进入 defer func()：
// 其中嵌套的 defer func() { fmt.Print(recover()) } 被注册，等待执行。
// 然后触发 panic(1)，替代了之前的 panic(2)，现在的 panic 为 1。
// 执行嵌套的 defer func() { fmt.Print(recover()) }：
// 调用 recover()，捕获了当前的 panic(1)，返回值为 1。
// 打印 1。
// 此时 panic 已被捕获并清除。
// 返回到第一个 defer func()：
// 再次调用 recover()，此时没有未被捕获的 panic，所以 recover() 返回 nil。
// 打印 nil。
