// 90. Subsets II

// Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

package main

import (
	"fmt"
	"sort"
)

func subsetsWithDup(nums []int) [][]int {
	results := make([][]int, 0)
	used := make(map[int]bool, 0)

	sort.Ints(nums)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {

		results = append(results, append([]int{}, path...))

		usedRow := make(map[int]bool, 0)
		for i := startIndex; i < len(nums); i++ {
			if _, exist := usedRow[nums[i]]; exist && usedRow[nums[i]] == true {
				continue
			}
			usedRow[nums[i]] = true

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
	res := subsetsWithDup([]int{1, 2, 2})
	fmt.Println(res)
}
