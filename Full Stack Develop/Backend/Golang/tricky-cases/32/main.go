package main

import "fmt"

func demo1() {
	var a = [5]int{1, 2, 3, 4, 5}
	var r [5]int

	for i, v := range a {
		if i == 0 {
			a[1] = 12
			a[2] = 13
		}
		r[i] = v
	}

	fmt.Println("r = ", r)
	fmt.Println("a = ", a)
}

func demo2() {

	// 切片在 go 的内部结构有一个指向底层数组的指针，当 range 表达式发生复制时，副本的指针依旧指向原底层数组，所以对切片的修改都会反应到底层数组上，所以通过 v 可以获得修改后的数组元素
	var a = []int{1, 2, 3, 4, 5}
	var r [5]int

	for i, v := range a {
		if i == 0 {
			a[1] = 12
			a[2] = 13
		}
		r[i] = v
	}
	fmt.Println("r = ", r)
	fmt.Println("a = ", a)
}

func main() {
	demo1()
	demo2()
}

// range 表达式是副本参与循环，就是说例子中参与循环的是 a 的副本，而不是真正的 a。就这个例子来说，假设 b 是 a 的副本，则 range 循环代码是这样的

// for i, v := range b {
//     if i == 0 {
//         a[1] = 12
//         a[2] = 13
//     }
//     r[i] = v
// }

// 因此无论 a 被如何修改，其副本 b 依旧保持原值，并且参与循环的是 b，因此 v 从 b 中取出的仍旧是 a 的原值，而非修改后的值。

// 如果想要 r 和 a 一样输出，修复办法：

// func main() {
//     var a = [5]int{1, 2, 3, 4, 5}
//     var r [5]int

//     for i, v := range &a {
//         if i == 0 {
//             a[1] = 12
//             a[2] = 13
//         }
//         r[i] = v
//     }
//     fmt.Println("r = ", r)
//     fmt.Println("a = ", a)
// }

// 或者

// func main() {
//     var a = []int{1, 2, 3, 4, 5}
//     var r [5]int

//     for i, v := range a {
//         if i == 0 {
//             a[1] = 12
//             a[2] = 13
//         }
//         r[i] = v
//     }
//     fmt.Println("r = ", r)
//     fmt.Println("a = ", a)
// }

// 切片在 go 的内部结构有一个指向底层数组的指针，当 range 表达式发生复制时，副本的指针依旧指向原底层数组，所以对切片的修改都会反应到底层数组上，所以通过 v 可以获得修改后的数组元素。
