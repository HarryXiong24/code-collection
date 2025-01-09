package main

type X struct{}

func (x *X) test() {
	println(x)
}

// func main() {
// 	var a *X
// 	a.test()
// 	X{}.test()
// }

// X{} 是不可寻址的，不能直接调用方。
// 在方法中，指针类型的接收者必须是合法指针（包括 nil）,或能获取实例地址。

func main() {
	var a *X
	a.test() // 相当于 test(nil)
	var x = X{}
	x.test()
}
