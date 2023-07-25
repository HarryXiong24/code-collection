package main

import "fmt"

func insertSort(nums []int) {
	for i := 1; i < len(nums); i++ {
		current := nums[i]
		j := i - 1
		for j >= 0 && nums[j] >= current {
			nums[j+1] = nums[j]
			j--
		}
		nums[j+1] = current
	}
}

// test
func main() {
	array := []int{10, 1, 3, 2, 9, 1, 5, 6}
	insertSort(array)
	fmt.Println(array)
}
