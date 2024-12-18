package main

import "fmt"

type Myint int

func (i Myint) PrintInt() {
	fmt.Println(i)
}

func main() {
	var i Myint = 1
	i.PrintInt()
}
