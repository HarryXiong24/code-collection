package main

import "fmt"

func demo1() {
	a := 5
	b := 8.1
	fmt.Println(a + b) // a 的类型是 int，b 的类型是 float，两个不同类型的数值不能相加，编译报错。

}

func demo2() {
	a := [5]int{1, 2, 3, 4, 5}
	t := a[3:4:4]
	fmt.Println(t[0])

	//	t 的起始索引为 3，所以切片从 a[3]（即值 4）开始。
	// 切片的结束索引为 4，但不包含 a[4]（即值 5）。
	// 切片的容量为 4，意味着切片可以扩展到 a 的最大长度（如果需要的话），即最多包含 4 个元素。
}

func demo3() {
	a := [2]int{5, 6}
	b := [3]int{5, 6}
	if a == b {
		fmt.Println("equal")
	} else {
		fmt.Println("not equal")
	}

	// Go 中的数组是值类型，可比较，另外一方面，数组的长度也是数组类型的组成部分，所以 a 和 b 是不同的类型，是不能比较的，所以编译错误。
}

func add() {
	demo1()
	demo2()
	demo3()
}
