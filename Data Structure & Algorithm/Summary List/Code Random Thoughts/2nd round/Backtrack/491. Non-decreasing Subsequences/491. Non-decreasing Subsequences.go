// 491. Non-decreasing Subsequences

// Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

// Example 1:
// Input: nums = [4,6,7,7]
// Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

// Example 2:
// Input: nums = [4,4,3,2,1]
// Output: [[4,4]]

package main

import "fmt"

func isNonDecreasing(nums []int) bool {

	if len(nums) < 2 {
		return false
	}

	for i := 1; i < len(nums); i++ {
		if nums[i-1] > nums[i] {
			return false
		}
	}

	return true
}

func findSubsequences(nums []int) [][]int {
	results := make([][]int, 0)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {

		if isNonDecreasing(path) == true {
			results = append(results, append([]int{}, path...))
		}

		used := make(map[int]bool, 0)
		for i := startIndex; i < len(nums); i++ {

			if _, exists := used[nums[i]]; exists && exists == true {
				continue
			}
			used[nums[i]] = true

			path = append(path, nums[i])
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}
	}

	backtrack(0, []int{})

	return results
}

// test
func main() {
	res := findSubsequences([]int{4, 6, 7, 7})
	fmt.Println(res)
}
