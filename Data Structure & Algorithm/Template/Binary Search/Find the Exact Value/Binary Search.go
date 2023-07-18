package main

import "fmt"

// Find the Exact Value
func binarySearch(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] < target {
			left = mid + 1
		} else if nums[mid] > target {
			right = mid - 1
		} else {
			return mid
		}
	}

	return -1
}

func main() {
	nums := []int{-1, 0, 3, 5, 9, 12}
	target := 9
	res := binarySearch(nums, target)
	fmt.Println(res)
}
