package main

import "fmt"

// DESCRIPTION
// Given an array of integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.

// Example 1:
// Input:
// nums = [2, 1, 5, 1, 3, 2]
// k = 3
// Output: 9
// Explanation: The subarray with the maximum sum is [5, 1, 3] with a sum of 9.

// Time Complexity: O(n)
// Space Complexity: O(1)
func maxSum(nums []int, k int) int {
	maxSum := 0

	if k > len(nums) || k == 0 {
		return maxSum
	}

	// calculate the sum of initial window
	for i := 0; i < k; i++ {
		maxSum += nums[i]
	}

	windowSum := maxSum
	for i := k; i < len(nums); i++ {
		// Adding the new element entering the window (nums[end])
		// Subtracting the old element leaving the window (nums[start])
		windowSum = windowSum - nums[i-k] + nums[i]
		if windowSum > maxSum {
			maxSum = windowSum
		}
	}

	return maxSum
}

// test
func main() {
	nums := []int{2, 1, 5, 1, 3, 2}
	k := 3
	fmt.Println(maxSum(nums, k))
}
