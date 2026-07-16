package main

import "fmt"

func main() {
	x := 1
	fmt.Println(x)
	{
		fmt.Println(x)    // 进入新的代码块作用域 { }，但 x 在外层已经声明了，所以这里访问的仍然是全局作用域中的 x
		i, x := 2, 2      // 这是一个新的变量声明语句，:= 作用是声明并初始化变量。在当前作用域中：声明新变量 i，值为 2。重新声明了变量 x，但这是一个全新的变量，作用域仅限于当前代码块，值为 2。此时，这个 x 屏蔽了外层的 x
		fmt.Println(i, x) // 2 2
	}
	// 离开代码块后，代码块中声明的 x 和 i 超出了作用域，被销毁。外层的 x 恢复可见
	fmt.Println(x) // print 1
}
