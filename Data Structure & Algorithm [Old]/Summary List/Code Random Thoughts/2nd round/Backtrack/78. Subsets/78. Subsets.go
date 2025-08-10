// 78. Subsets

// Given an integer array nums of unique elements, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

package main

import (
	"fmt"
)

func subsets(nums []int) [][]int {
	results := make([][]int, 0)
	used := make(map[int]bool, 0)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {

		results = append(results, append([]int{}, path...))

		for i := startIndex; i < len(nums); i++ {
			used[nums[i]] = true
			path = append(path, nums[i])
			backtrack(i+1, path)
			path = path[:len(path)-1]
			used[nums[i]] = false
		}
	}

	backtrack(0, []int{})

	return results
}

// test
func main() {
	res := subsets([]int{1, 2, 3})
	fmt.Println(res)
}
