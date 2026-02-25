package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to calculate the total amount of water trapped between bars on an elevation map, where each bar's width is 1. The input is given as an array of n non-negative integers height representing the height of each bar.

// Example:
// Count: 10
// height = [3, 4, 1, 2, 2, 5, 1, 0, 2]
// Output: 10

// Time Complexity: O(n)
// Space Complexity: O(1)
func trappingWater(height []int) int {
	count := 0
	if len(height) == 0 {
		return count
	}

	slow := 0
	fast := slow + 1
	right := len(height) - 1 // the rightmost index

	// this loop is to find the rightmost index of the highest bar, because the right side of the highest bar is not able to trap water
	for right >= 0 {
		if height[right-1] > height[right] {
			right--
		} else {
			break
		}
	}

	// this loop is to calculate the amount of water trapped between the bars
	for fast <= right {
		if height[slow] <= height[fast] {
			slow = fast
		} else {
			count += height[slow] - height[fast]
			fmt.Println(height[slow] - height[fast])
		}
		fast++
	}

	// this is to calculate the amount of water trapped between the highest bar and the rightmost bar, because the right side of the highest bar is not able to trap water
	if height[slow] > height[right] {
		count -= (height[slow] - height[right]) * (right - slow)
	}

	return count
}

// test
func main() {
	nums := []int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}
	res := trappingWater(nums)
	fmt.Println(res)
}
