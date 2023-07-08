package main

import (
	"fmt"
)

// const (
// 	BEIJING  = 0
// 	SHANGHAI = 1
// 	SHENZHEN = 2
// )

// iota常量计数器，自加 1
const (
	BEIJING = 10 * iota
	SHANGHAI
	SHENZHEN
)

func main() {
	// var 关键字
	// 方法1 声明一个变量，默认值是0
	var a int
	fmt.Println("a=", a)
	fmt.Printf("a的类型是:%T\n", a)

	// 方法2 声明一个变量，并且初始化一个值
	var b int = 100
	fmt.Printf("b=%d, b 的类型是:%T\n", b, b)

	// 方法3 初始化的时候，去掉数据类型,Go语言通过值自动匹配类型
	var c = 100
	fmt.Printf("c=%d, c 的类型是:%T\n", c, c)

	var cc = "Go"
	fmt.Printf("cc=%s, cc 的类型是:%T\n", cc, cc)

	// 方法4 短声明 :=
	e := 100
	fmt.Printf("e=%d, e 的类型是:%T\n", e, e)

	f := "Go"
	fmt.Printf("f=%s,f 的类型是%T\n", f, f)

	// 声明多个
	var xx, yy int = 100, 200
	mm, nn := 300, "code"

	var (
		tt int    = 100
		pp string = "code"
	)

	fmt.Println(xx, yy, mm, nn, tt, pp)

	// 常量，不可修改
	const length = 10
	fmt.Println("BEIJING=", BEIJING)
	fmt.Println("SHANGHAI=", SHANGHAI)
	fmt.Println("SHENZHEN=", SHENZHEN)
}
