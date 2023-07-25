package main

import "fmt"

func bubbleSort(nums []int) {
	for i := len(nums); i > 0; i-- {
		for j := 0; j < i-1; j++ {
			if nums[j] > nums[j+1] {
				temp := nums[j]
				nums[j] = nums[j+1]
				nums[j+1] = temp
			}
		}
	}
}

// test
func main() {
	array := []int{10, 1, 3, 2, 9, 1, 5, 6}
	bubbleSort(array)
	fmt.Println(array)
}
