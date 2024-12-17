package main

import "fmt"

// 删除 map 不存在的键值对时，不会报错，相当于没有任何作用；获取不存在的减值对时，返回值类型对应的零值，所以返回 0。

func main() {
	s := make(map[string]int)
	delete(s, "h")
	fmt.Println(s["h"])
}
