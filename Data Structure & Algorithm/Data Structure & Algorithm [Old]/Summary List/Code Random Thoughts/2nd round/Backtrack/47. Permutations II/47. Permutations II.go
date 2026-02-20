// 47. Permutations II

// Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

// Example 1:
// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]

// Example 2:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

package main

import (
	"fmt"
	"sort"
)

func permuteUnique(nums []int) [][]int {
	results := make([][]int, 0)
	used := make([]bool, len(nums))

	sort.Ints(nums)

	var backtrack func(path []int)
	backtrack = func(path []int) {

		if len(path) == len(nums) {
			results = append(results, append([]int{}, path...))
			return
		}

		usedRow := make(map[int]bool, 0)
		for i := 0; i < len(nums); i++ {

			if used[i] == true {
				continue
			}

			if _, exists := usedRow[nums[i]]; exists {
				continue
			}
			usedRow[nums[i]] = true

			used[i] = true
			path = append(path, nums[i])
			backtrack(path)
			path = path[:len(path)-1]
			used[i] = false
		}
	}

	backtrack([]int{})

	return results
}

func main() {
	res := permuteUnique([]int{1, 1, 2})
	fmt.Println(res)
}
