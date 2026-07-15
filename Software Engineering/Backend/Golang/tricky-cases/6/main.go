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
	m = iota
)

func main() {
	fmt.Println(x, y, z, k, p, q, m) // 0 2 zz zz 5 7 7
}
