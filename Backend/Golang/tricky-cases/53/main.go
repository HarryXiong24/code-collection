package main

import "fmt"

type T struct {
	x int
	y *int
}

func main() {

	i := 20
	t := T{10, &i}

	p := &t.x

	*p++
	*p--

	t.y = p

	fmt.Println(*t.y)
}

// 递增运算符 ++ 和递减运算符 – 的优先级低于解引用运算符 * 和取址运算符 &
// 引用运算符 * 和取址运算符 & 的优先级低于选择器 . 中的属性选择操作符。
