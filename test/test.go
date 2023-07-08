package main

import "fmt"

func test() string {
	fmt.Println("1")
	defer fmt.Println("2")
	fmt.Println("3")
	return "4"
}

func main() {
	res := test()
	fmt.Println(res)
}
