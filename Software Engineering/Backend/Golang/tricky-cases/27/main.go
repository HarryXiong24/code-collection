package main

import "fmt"

type Direction int

const (
	North Direction = iota
	East
	South
	West
)

func (d Direction) String() string {
	return [...]string{"North", "East", "South", "West"}[d]
}

// [...]*string{"North", "East", "South", "West"} 表示定义了一个数组：
// [...]：表示数组长度是根据初始化时的元素个数自动推断的（这里长度是 4）。
// string：数组元素的类型是字符串。
// {"North", "East", "South", "West"}：初始化数组时的具体元素。
// 等价于：var directions [4]string = [4]string{"North", "East", "South", "West"}

func main() {
	fmt.Println(South)
}
