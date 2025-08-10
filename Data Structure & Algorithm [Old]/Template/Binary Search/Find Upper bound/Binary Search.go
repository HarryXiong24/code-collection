package main

import "fmt"

// Find Upper bound
func binarySearch(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2
		if nums[mid] >= target {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	if right+1 < len(nums) && nums[right+1] == target {
		return right + 1
	}

	return -1
}

func main() {
	nums := []int{-1, 0, 3, 5, 9, 12}
	target := 9
	res := binarySearch(nums, target)
	fmt.Println(res)
}
