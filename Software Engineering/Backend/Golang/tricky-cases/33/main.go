package main

import "fmt"

func change(s ...int) {
	s = append(s, 3) // 不改变原来的 slice
}

func main() {
	slice := make([]int, 5, 5) // [0,0,0,0,0]
	slice[0] = 1
	slice[1] = 2 // [1,2,0,0,0]
	change(slice...)
	fmt.Println(slice) // [1,2,0,0,0]
	change(slice[0:2]...)
	fmt.Println(slice) // [1,2,3]
}

// Go 提供的语法糖…，可以将 slice 传进可变函数，不会创建新的切片
// 第一次调用 change() 时，append() 操作使切片底层数组发生了扩容，原 slice 的底层数组不会改变
// 第二次调用 change() 函数时，使用了操作符 [i,j] 获得一个新的切片，假定为 slice1，它的底层数组和原切片底层数组是重合的，不过 slice1 的长度、容量分别是 2、5，所以在 change() 函数中对 slice1 底层数组的修改会影响到原切片

// 在 Go 中，append 函数可能会创建一个新的底层数组，但这取决于切片的容量是否足够容纳追加的元素。
// 如果容量不足，append 会分配一个新的底层数组并将现有的元素复制过去；否则，它会直接在现有的底层数组上操作。
