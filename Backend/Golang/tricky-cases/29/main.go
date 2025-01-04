package main

import "fmt"

var p *int

func foo() (*int, error) {
	var i int = 5
	return &i, nil
}

func bar() {
	// use p
	fmt.Println(*p)
}

func main() {
	p, err := foo()
	if err != nil {
		fmt.Println(err)
		return
	}
	bar()
	fmt.Println(*p)
}

// 问题出在操作符:=
// 对于使用 := 定义的变量，如果新变量与同名已定义的变量不在同一个作用域中，那么 Go 会新定义这个变量
// 对于本例来说，main() 函数里的 p 是新定义的变量，会遮住全局变量 p，导致执行到bar() 时程序，全局变量 p 依然还是 nil，程序随即 Crash

// 正确的做法是将 main() 函数修改为：

// func main() {
// 	var err error
// 	p, err = foo()
// 	if err != nil {
// 		fmt.Println(err)
// 		return
// 	}
// 	bar()
// 	fmt.Println(*p)
// }
