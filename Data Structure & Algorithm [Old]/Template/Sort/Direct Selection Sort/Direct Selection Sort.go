package main

import "fmt"

func selectionSort(nums []int) {
	for i := 0; i < len(nums); i++ {
		min := i
		for j := i + 1; j < len(nums); j++ {
			if nums[min] > nums[j] {
				min = j
			}
		}
		temp := nums[i]
		nums[i] = nums[min]
		nums[min] = temp
	}
}

// test
func main() {
	array := []int{10, 1, 3, 2, 9, 1, 5, 6}
	selectionSort(array)
	fmt.Println(array)
}
