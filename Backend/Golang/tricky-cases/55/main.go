package main

import "fmt"

func main() {
	var k = 9
	for k = range []int{} {
		// 使用 range 遍历一个空的切片 []int{}，因为切片为空，没有任何元素，所以循环体不会执行，k 的值不会被修改。
	}
	fmt.Println(k) // 9

	for k = 0; k < 3; k++ {
	}
	fmt.Println(k) // 3

	for k = range (*[3]int)(nil) {
		// (*[3]int)(nil)：将 nil 强制转换为指向长度为 3 的数组指针
		// range 遍历这个数组（尽管数组指针是 nil），在 Go 中这是合法的，range 不会因为数组指针是 nil 而报错。
		// 遍历时，k 会依次取数组的索引值 0、1、2。
		// 这段代码没有循环体，所以没有具体操作，只是改变了 k 的值。
	}
	fmt.Println(k) // 2
}
