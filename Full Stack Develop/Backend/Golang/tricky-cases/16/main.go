package main

import "fmt"

func increaseA() int {
	var i int // 声明局部变量 i，初始值为 0
	defer func() {
		i++ // 在 defer 函数中，i 会自增 1
	}()
	return i // 将 i 的值返回
}

// var i int：声明局部变量 i，初始值为 0。
// defer 声明的匿名函数 func() { i++ } 会被推入栈中，但不会立即执行。
// return i：此时，i 的值（0）被作为返回值存储到返回值区域。
// 执行 defer：
// 在函数返回之前，所有 defer 的函数会按后进先出的顺序执行。
// i++ 将局部变量 i 自增为 1，但此时 return 的值已经被保存（仍然是 0）。
// 返回值是 0。

func increaseB() (r int) {
	defer func() {
		r++ // 在 defer 中操作命名返回值 r
	}()
	return r // 返回命名返回值 r
}

// r 是一个命名返回值，初始值为 0。
// defer 声明的匿名函数 func() { r++ } 会被推入栈中，但不会立即执行。
// return r：
// 对于命名返回值 r，return 的行为是：
// 先将 r 的值保存到返回值区域（当前 r 是 0）。
// 但函数结束前，defer 会先执行。
// 执行 defer：
// defer 中的 r++ 会将 r 自增为 1。
// 由于 r 是命名返回值，它的修改会影响实际返回值。
// 返回值是 1。
// increaseB 的返回值：1。

func f1() (r int) {
	defer func() {
		r++
	}()
	return r
}

func f2() (r int) {
	t := 5
	defer func() {
		t = t + 5
	}()
	return t
}

func f3() (r int) {
	defer func(r int) { // 这里的 r 是一个传值（值拷贝）的局部变量
		r = r + 5 // 修改的是 defer 中的 r，不会影响外部的 r
	}(r) // 传递的是命名返回值 r 的值，此时 r 的值是 0
	return 1 // 修改命名返回值 r 的值为 1
}

func main() {
	fmt.Println(increaseA())
	fmt.Println(increaseB())

	fmt.Println(f1())
	fmt.Println(f2())
	fmt.Println(f3())
}

// 局部变量和命名返回值的区别：

// increaseA 中的 i 是局部变量，defer 修改的是局部变量，返回值在 return 语句时已经确定，defer 的修改不会影响返回值。
// increaseB 使用命名返回值 r，defer 可以直接修改 r 的值，影响最终的返回值。

// defer 执行时机：
// defer 在函数返回之前执行，但在 return 保存返回值之后。如果返回值是命名的，defer 可以修改它；否则不能。
