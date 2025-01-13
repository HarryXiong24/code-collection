package main

import "fmt"

func F(n int) func() int {
	return func() int {
		n++
		return n
	}
}

func main() {
	f := F(5)
	defer func() {
		fmt.Println(f())
	}()
	defer fmt.Println(f()) // 6
	i := f()               // 7
	fmt.Println(i)
}

// f := F(5) 初始化闭包，n = 5。

// defer fmt.Println(f())：f() 被立即调用，n++，n = 6，延迟打印 6。

// i := f()：调用 f()，n++，n = 7。
// i = 7，fmt.Println(i)：打印 7。

// defer func() { fmt.Println(f()) }()：延迟调用。
// 函数返回，执行延迟的内容：defer func() { fmt.Println(f()) }()：
// 调用 f()，n++，n = 8。
// 打印 8。
