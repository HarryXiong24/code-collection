package main

import (
	"fmt"
	"math"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given an integer array nums and an integer k, write a function to identify the highest possible sum of a subarray within nums, where the subarray meets the following criteria: its length is k, and all of its elements are unique. If no such subarray exists, return 0.

// Example 1:
// Input:
// nums = [3, 2, 2, 3, 4, 6, 7, 7, -1]
// k = 4
// Output: 20
// Explanation: The subarrays of nums with length 4 are:
// [3, 2, 2, 3] # elements 3 and 2 are repeated.
// [2, 2, 3, 4] # element 2 is repeated.
// [2, 3, 4, 6] # meets the requirements and has a sum of 15.
// [3, 4, 6, 7] # meets the requirements and has a sum of 20.
// [4, 6, 7, 7] # element 7 is repeated.
// [6, 7, 7, -1] # element 7 is repeated.
// We return 20 because it is the maximum subarray sum of all the subarrays that meet the conditions.

// Example 2:
// Input:
// nums = [5, 5, 5, 5, 5]
// k = 3
// Output: 0
// Explanation: Every subarray of length 3 contains duplicate elements, so no valid subarray exists. Return 0.

// Time Complexity: O(n)
// Space Complexity: O(k)
func maxSum(nums []int, k int) int64 {

	dict := make(map[int]int)
	maxSum := math.MinInt64
	windowSum := 0

	// when solving slide window problems, it is better to use two points to mock slide window instead of using queue, since two points is easy to look back order
	start := 0
	for end := 0; end < len(nums); end++ {
		// every time we need to add a new element into slide window
		windowSum += nums[end]
		dict[nums[end]]++

		// if the length of slide window is full
		if end-start+1 == k {
			// if every element only occur once
			if len(dict) == k {
				maxSum = max(maxSum, windowSum)
			}
			// remove the head element in the slide window
			windowSum = windowSum - nums[start]
			dict[nums[start]]--
			// delete to make sure len(dict) is accurate
			if dict[nums[start]] == 0 {
				delete(dict, nums[start])
			}
			start++
		}
	}

	if maxSum == math.MinInt64 {
		return 0
	}

	return int64(maxSum)
}

// test
func main() {
	nums := []int{3, 2, 2, 3, 4, 6, 7, 7, -1}
	k := 4
	fmt.Println(maxSum(nums, k))
}
