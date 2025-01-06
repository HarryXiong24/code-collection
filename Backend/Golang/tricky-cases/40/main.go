package main

import "fmt"

func main() {
	x := interface{}(nil) // x 被赋值为一个空的 interface{}（接口值），它的动态类型和动态值都为 nil。
	y := (*int)(nil)
	a := y == x             // false
	b := y == nil           // true
	_, c := x.(interface{}) // false
	fmt.Println(a, b, c)
}

// 在 Go 中，interface 类型的比较遵循以下规则：如果一个接口变量非空，它的比较会检查其 动态类型 和 动态值。
// x 是一个空的接口，动态类型为 nil，动态值也为 nil。
// y 是一个具体类型 *int 的 nil 值。
// 因为 x 的动态类型是 nil，而 y 的动态类型是 *int，类型不匹配，所以比较结果为 false。

// 类型断言语法：i.(Type)，其中 i 是接口，Type 是类型或接口
// 编译时会自动检测 i 的动态类型与 Type 是否一致
// 但是，如果动态类型不存在，则断言总是失败

// x 是一个接口值，它的动态类型和动态值都为 nil。
// 类型断言 x.(interface{}) 尝试将 x 的动态类型断言为 interface{}。
// 然而，x 的动态类型本身是 nil，而不是一个有效的 interface{}，所以断言失败。
// _, c 解构了类型断言的结果，其中 _ 丢弃了值，c 则接收了断言是否成功的布尔值，这里是 false。
