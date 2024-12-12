package main

import "fmt"

const (
	x = iota
	_
	y
	z = "zz"
	k
	p = iota
	q = iota + 1
)

func main() {
	fmt.Println(x, y, z, k, p, q) // 0 2 zz zz 5 7
}
