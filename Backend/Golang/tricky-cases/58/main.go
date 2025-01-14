package main

import "fmt"

type T struct {
	n int
}

func main() {
	ts := [2]T{}
	fmt.Println(ts) // [{0} {0}]
	for i, t := range ts {
		switch i {
		case 0:
			t.n = 3 // for-range 循环数组。此时使用的是数组 ts 的副本，所以 t.n = 3 的赋值操作不会影响原数组。
			ts[1].n = 9
		case 1:
			fmt.Print(t.n, " ") // 0
		}
	}
	fmt.Println(ts)

	ts1 := [2]T{}
	fmt.Println(ts1) // [{0} {0}]
	for i, t := range &ts1 {
		switch i {
		case 0:
			t.n = 3 // for-range 循环中的循环变量 t 是原数组元素的副本。如果数组元素是结构体值，则副本的字段和原数组字段是两个不同的值
			ts1[1].n = 9
		case 1:
			fmt.Print(t.n, " ")
		}
	}
	fmt.Println(ts1)
}

// 1. range ts：
// 直接对数组进行值传递，range 遍历数组的副本。
// 不会修改原数组。

// 2. range &ts：
// 遍历的是数组指针指向的数组。
// 虽然访问的是数组指针，但返回的依然是数组元素的副本。
// 修改 t 依然不会影响原数组。
