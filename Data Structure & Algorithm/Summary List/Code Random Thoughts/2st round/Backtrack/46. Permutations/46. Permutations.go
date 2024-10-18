// 46. Permutations

// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

// Example 3:
// Input: nums = [1]
// Output: [[1]]

package main

import (
	"fmt"
)

func permute(nums []int) [][]int {
	results := make([][]int, 0)
	used := make(map[int]bool, 0)

	var backtrack func(path []int)
	backtrack = func(path []int) {

		if len(path) == len(nums) {
			results = append(results, append([]int{}, path...))
			return
		}

		for i := 0; i < len(nums); i++ {
			if used[nums[i]] == true {
				continue
			}

			used[nums[i]] = true
			path = append(path, nums[i])
			backtrack(path)
			path = path[:len(path)-1]
			used[nums[i]] = false
		}
	}

	backtrack([]int{})

	return results
}

// test
func main() {
	res := permute([]int{1, 2, 3})
	fmt.Println(res)
}
