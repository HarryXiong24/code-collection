package main

import (
	"fmt"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given an input integer array nums, write a function to find all unique triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct indices, and the sum of nums[i], nums[j], and nums[k] equals zero. Ensure that the resulting list does not contain any duplicate triplets.

// Input:
// nums = [-1,0,1,2,-1,-1]
// Output:
// [[-1,-1,2],[-1,0,1]]
// Explanation: Both nums[0], nums[1], nums[2] and nums[1], nums[2], nums[4] both include [-1, 0, 1] and sum to 0. nums[0], nums[3], nums[4] ([-1,-1,2]) also sum to 0.

// Since we are looking for unique triplets, we can ignore the duplicate [-1, 0, 1] triplet and return [[-1, -1, 2], [-1, 0, 1]].
// The order of the triplets and the order of the elements within the triplets do not matter.

// Time Complexity: O(n^2)
// Space Complexity: O(n)
func threeSum(nums []int) [][]int {
	res := make([][]int, 0)
	sort.Slice(nums, func(i, j int) bool {
		return nums[i] < nums[j]
	})

	// first we stick to the first element and then use two pointers to find the other two elements
	for i := 0; i < len(nums); i++ {
		// this is to avoid duplicate triplets for next iteration
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		left := i + 1
		right := len(nums) - 1

		for left < right {
			fmt.Println(left, right)
			if nums[left]+nums[right]+nums[i] < 0 {
				left++
			} else if nums[left]+nums[right]+nums[i] > 0 {
				right--
			} else {
				res = append(res, []int{nums[i], nums[left], nums[right]})

				// this is to avoid duplicate triplets that has been used in the current iteration
				for left < right && nums[left+1] == nums[left] {
					left++
				}

				for left < right && nums[right-1] == nums[right] {
					right--
				}

				left++
				right--
			}
		}
	}

	return res
}

func main() {
	nums := []int{-1, 0, 1, 2, -1, -1}
	res := threeSum(nums)
	fmt.Println(res)
}
