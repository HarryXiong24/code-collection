package main

import (
	"fmt"
	"reflect"
)

func main() {
	var x interface{}
	var y interface{} = []int{3, 5}
	fmt.Println(reflect.TypeOf(x), reflect.TypeOf(y))
	_ = x == x
	_ = x == y
	_ = y == y
}

// 第 14 行 panic, 因为两个比较值的动态类型为同一个不可比较类型。
