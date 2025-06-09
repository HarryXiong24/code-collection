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

// Find Lower bound
func binarySearch_lowerBound(nums []int, target int) int {
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

	if left > 0 && nums[left-1] == target {
		return left - 1
	}

	return -1
}

// Find Upper bound
func binarySearch_upperBound(nums []int, target int) int {
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

	if right < len(nums)-1 && nums[right+1] == target {
		return right + 1
	}

	return -1
}

// test
func main() {
	arr := []int{-1, 0, 3, 5, 9, 12}
	target := 9

	res := binarySearch(arr, target)
	fmt.Println(res)

	res1 := binarySearch_lowerBound(arr, target)
	fmt.Println(res1)

	res2 := binarySearch_upperBound(arr, target)
	fmt.Println(res2)
}
