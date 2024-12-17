package main

import "fmt"

// 1
func demo1() {
	s := make([]int, 5) // s = [0, 0, 0, 0, 0]
	s = append(s, 1, 2, 3)
	fmt.Println(s)
}

// 2
func demo2() {
	s := make([]int, 0) // s = []
	s = append(s, 1, 2, 3, 4)
	fmt.Println(s)
}

func main() {
	demo1()
	demo2()
}
