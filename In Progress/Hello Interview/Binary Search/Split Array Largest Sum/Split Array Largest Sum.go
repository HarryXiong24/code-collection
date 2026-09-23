package main

// DESCRIPTION (inspired by Leetcode.com)
// You are given an array nums and an integer k. nums represents the weights of n consecutive tasks while k represents the number of workers. Tasks are assigned to the workers as contiguous blocks.

// Your goal is to distribute the work so that the heaviest workload (sum of task weights for any single worker) is as small as possible.

// Return the minimum possible value of the maximum workload.

// Example 1:

// Input:

// nums = [4, 8, 15, 7, 3], k = 3
// Output: 15

// Explanation: One optimal split is [4, 8] (sum=12), [15] (sum=15), [7, 3] (sum=10). The maximum workload among workers is 15.

// Example 2:

// Input:

// nums = [6, 3, 9, 2, 1, 8], k = 2
// Output: 18

// Explanation: Split into [6, 3, 9] (sum=18) and [2, 1, 8] (sum=11). The heaviest workload is 18. Any other split with 2 groups results in a higher maximum.

func splitArray(nums []int, k int) int {
	// Your code goes here

	return 0
}

func main() {
	// Example usage
	nums1 := []int{4, 8, 15, 7, 3}
	k1 := 3
	result1 := splitArray(nums1, k1)
	println("Example 1 Output:", result1) // Expected: 15

	nums2 := []int{6, 3, 9, 2, 1, 8}
	k2 := 2
	result2 := splitArray(nums2, k2)
	println("Example 2 Output:", result2) // Expected: 18
}
