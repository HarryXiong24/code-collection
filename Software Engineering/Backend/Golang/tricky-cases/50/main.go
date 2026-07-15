package main

import (
	"fmt"
)

func main() {
	s := make([]int, 3, 9)
	fmt.Println(len(s))
	fmt.Println(s)
	s2 := s[4:8]
	fmt.Println(len(s2))
	fmt.Println(s2)
}

// 从一个基础切片派生出的子切片的长度可能大于基础切片的长度
// 假设基础切片是 baseSlice，使用操作符 [low,high]，有如下规则：0 <= low <= high <= cap(baseSlice)，只要上述满足这个关系，下标 low 和 high 都可以大于 len(baseSlice)
