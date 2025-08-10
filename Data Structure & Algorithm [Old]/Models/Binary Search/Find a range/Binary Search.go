package main

import (
	"fmt"
)

// Find a range
func binarySearch(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left+1 < right {
		mid := left + int((right-left))/2
		if nums[mid] < target {
			left = mid
		} else if nums[mid] > target {
			right = mid
		} else {
			return mid
		}
	}

	// End Condition: left + 1 == right
	if nums[left] == target {
		return left
	}
	if nums[right] == target {
		return right
	}

	return -1
}

func main() {
	nums := []int{2, 5}
	target := 5
	res := binarySearch(nums, target)
	fmt.Println(res)
}
