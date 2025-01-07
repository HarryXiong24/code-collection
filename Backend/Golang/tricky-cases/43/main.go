package main

import "fmt"

const (
	x uint16 = 120
	y
	s = "abc"
	z
)

func main() {
	fmt.Printf("%T %v\n", y, y) // uint16 120
	fmt.Printf("%T %v\n", z, z) // string abc
}

// 常量组中如不指定类型和初始化值，则与上一行非空常量右值相同
