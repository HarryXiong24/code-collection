package main

import "fmt"

// Find Upper bound
func binarySearch(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] <= target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	if left-1 >= 0 && nums[left-1] == target {
		return left - 1
	}

	return -1
}

func main() {
	nums := []int{-1, 0, 3, 5, 9, 12}
	target := 9
	res := binarySearch(nums, target)
	fmt.Println(res)
}
