package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to sort a given integer array nums in-place (and without the built-in sort function), where the array contains n integers that are either 0, 1, and 2 and represent the colors red, white, and blue. Arrange the objects so that same-colored ones are adjacent, in the order of red, white, and blue (0, 1, 2).

// Input:
// nums = [2,1,2,0,1,0,1,0,1]
// Output:
// [0,0,0,1,1,1,1,2,2]

// Time Complexity: O(n)
// Space Complexity: O(1)
func sortColors(nums []int) {
	// According to the rules
	// red -> 0, white -> 1, blue -> 2
	left := 0
	right := len(nums) - 1

	// this loop is used to iterate color
	for i := 0; i <= 2; i++ {
		right = len(nums) - 1

		for left <= right {
			if nums[left] == i {
				// if nums[left] is equal to current color, don't move
				left++
			} else if nums[right] == i {
				// if nums[right] is equal to current color, move to the left
				temp := nums[left]
				nums[left] = nums[right]
				nums[right] = temp
				left++
				right--
			} else {
				// otherwise, right--
				right--
			}
		}
	}
}

// We can understand this algorithm by looking at the invariants which hold true after each iteration:
// All elements to the left of the left are 0s.
// All elements between left and i - 1 are 1s.
// All elements between i and right are unsorted.
// All elements to the right of right are 2s.
func sortColors2(nums []int) {
	left := 0
	right := len(nums) - 1

	i := 0

	for i <= right {
		switch nums[i] {
		case 0:
			temp := nums[i]
			nums[i] = nums[left]
			nums[left] = temp
			left++
			i++
		case 2:
			temp := nums[i]
			nums[i] = nums[right]
			nums[right] = temp
			right--
		default:
			i++
		}
	}
}

// test
func main() {
	nums := []int{2, 0, 2, 1, 1, 0}
	sortColors(nums)
	fmt.Println(nums)

	nums = []int{2, 0, 2, 1, 1, 0}
	sortColors2(nums)
	fmt.Println(nums)
}
