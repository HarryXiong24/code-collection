package main

import "fmt"

func hello(num ...int) {
	num[0] = 18
}

func main() {
	i := []int{5, 6, 7}
	hello(i...)
	fmt.Println(i[0])
}

// i := []int{5, 6, 7}
// 这行代码创建了一个切片 i，其中包含三个元素：5，6，7。

// hello(i...)
// 这行代码将切片 i 传递给 hello 函数，使用 ... 语法展开切片。展开后，i 切片的元素将被作为独立的参数传递给 hello 函数。hello 函数接收到一个参数 num，这个参数是一个切片，包含 i 中的元素：[5, 6, 7]。

// num[0] = 18
// 这里，hello 函数修改了 num 切片的第一个元素，将其值改为 18。由于 Go 语言中的切片是引用类型，这意味着 num 和传入的切片 i 指向同一内存地址。因此，num 中的修改也会影响到 i。

// fmt.Println(i[0])
// 最后，在 main 函数中打印 i[0]，此时 i[0] 的值已经被 hello 函数修改为 18，因此输出为 18。
