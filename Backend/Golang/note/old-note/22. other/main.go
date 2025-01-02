package main

import "fmt"

// func main() {
// 	// 静态类型 变量声明时候的类型
// 	// var number int
// 	// var name string

// 	// 动态类型 程序运行时系统才能看见的类型。
// 	// var in interface{}
// 	// in = 100
// 	// in = "xxx"

// 	var number int = 100
// 	fmt.Println(number)
// 	number2 := (int)(100)
// 	fmt.Println(number2)
// 	fmt.Printf("number2 type : %T,data:%v\n", number2, number2)
// 	number3 := (interface{})(100)
// 	fmt.Println(number3)
// 	fmt.Printf("number3 type : %T,data:%v\n", number3, number3)
// }

func main() {
	// bookFunc := func() {
	// 	fmt.Println("《Go语言极简一本通》")
	// }
	// bookFunc()
	// fmt.Printf("bookFunc 的类型是%T\n", bookFunc)

	// f := func(x, y string) string {
	// 	return x + y
	// }
	// printRes(f)

	// s := show()
	// fmt.Println(s("欢喜", "《Go语言极简一本通》"))

	// 闭包
	x := 100
	func() {
		fmt.Println(x)
	}()
}

// 高阶函数
func printRes(show func(author, book string) string) {
	fmt.Println(show("xxx", "sdasds"))
}

// 高阶函数
func show() func(author, book string) string {
	return func(x, y string) string {
		return x + y
	}
}
