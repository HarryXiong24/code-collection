package main

import "fmt"

func f(n int) (r int) {
	defer func() {
		r += n
		recover()
	}()

	var f func()

	defer f()

	f = func() {
		r += 2
	}

	return n + 1
}

// return xxx => 1. r = xxx, call defer, 空 return

// 提到的“三步拆解法”
// 第一步执行 r = n + 1
// 接着执行第二个 defer，由于此时 f() 未定义，引发异常
// 随即执行第一个 defer，异常被 recover()，程序正常执行，最后 return

func main() {
	fmt.Println(f(3))
}
