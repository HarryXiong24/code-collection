package main

import "fmt"

type N int

func (n N) test() {
	fmt.Println(n)
}

func main() {
	var n N = 10
	fmt.Println(n)

	n++
	f1 := N.test
	f1(n)

	n++
	f2 := (*N).test
	f2(&n)
}

// 通过类型引用的方法表达式会被还原成普通函数样式，接收者是第一个参数，调用时显示传参
// 类型可以是 T 或 *T，只要目标方法存在于该类型的方法中就可以

// 还可以直接使用方法表达式调用：

// func main() {
// 	var n N = 10

// 	fmt.Println(n)

// 	n++
// 	N.test(n)

// 	n++
// 	(*N).test(&n)
// }
