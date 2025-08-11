// 209. Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1

// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

package main

import (
	"fmt"
	"math"
)

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func minSubArrayLen(target int, nums []int) int {
	slow := 0
	fast := 0

	sum := 0
	res := math.MaxInt64

	for fast < len(nums) {

		sum += nums[fast]

		if sum >= target {
			for sum-nums[slow] >= target {
				sum -= nums[slow]
				slow++
				res = min(res, fast-slow+1)
			}
		}

		fast++
	}

	if res == math.MaxInt64 {
		return -1
	}

	return res
}

// test
func main() {
	res := minSubArrayLen(7, []int{2, 3, 1, 2, 4, 3})
	fmt.Println(res) // 2
}
