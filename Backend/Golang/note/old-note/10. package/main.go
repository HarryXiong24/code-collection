package main

import (
	"MyPackage/book"
	"fmt"
	// "crypto/rand"
	// mrand "math/rand"
)

// package packageName

// import path
// import(
//   path1
//   path2
//   ...
// )

func init() {
	fmt.Println("init...")
}

/*
包的初始化顺序
1 包级别的变量
2 init() 根据编译器解析的顺序进行调用

包的匿名导入
import _ 包名
*/
func main() {
	fmt.Println("<xxx>")
	info, _ := book.ShowBookInfo("<xxx>", "Tony")
	fmt.Println(info)
}
