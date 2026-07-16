package main

import "fmt"

func main() {
	v := []int{1, 2, 3}
	for i := range v {
		v = append(v, i)
	}

	fmt.Println(v)
}

// 不会出现死循环，能正常结束
// 循环次数在循环开始前就已经确定，循环内改变切片的长度，不影响循环次数。
