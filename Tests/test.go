package main

import "fmt"

func modifySlice(s []int) {
	s[0] = 100
	s = append(s, 200)
}

func main() {
	slice := []int{1, 2, 3, 4, 5}
	fmt.Println("Before modification:", slice)

	modifySlice(slice)
	fmt.Println("After modification:", slice)
}
