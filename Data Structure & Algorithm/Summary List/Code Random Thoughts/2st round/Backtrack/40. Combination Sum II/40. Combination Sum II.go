// 40. Combination Sum II

// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

// Example 1:
// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

// Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output:
// [
// [1,2,2],
// [5]
// ]

package main

import (
	"fmt"
	"sort"
)

func combinationSum2(candidates []int, target int) [][]int {
	results := make([][]int, 0)
	sort.Ints(candidates)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {
		sum := 0
		for _, value := range path {
			sum += value
		}

		if sum == target {
			results = append(results, append([]int{}, path...))
			return
		}

		if sum > target {
			return
		}

		for i := startIndex; i < len(candidates); i++ {
			if i > startIndex && candidates[i] == candidates[i-1] {
				continue
			}
			path = append(path, candidates[i])
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}

	}

	backtrack(0, []int{})

	return results
}

func combinationSum2Set(candidates []int, target int) [][]int {
	results := make([][]int, 0)
	sort.Ints(candidates)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {
		sum := 0
		for _, value := range path {
			sum += value
		}

		if sum == target {
			results = append(results, append([]int{}, path...))
			return
		}

		if sum > target {
			return
		}

		used := make(map[int]bool)
		for i := startIndex; i < len(candidates); i++ {
			if _, exists := used[candidates[i]]; exists {
				continue
			}
			used[candidates[i]] = true

			path = append(path, candidates[i])
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}

	}

	backtrack(0, []int{})

	return results
}

// test
func main() {
	res := combinationSum2([]int{10, 1, 2, 7, 6, 1, 5}, 8)
	res1 := combinationSum2Set([]int{10, 1, 2, 7, 6, 1, 5}, 8)
	fmt.Println(res)
	fmt.Println(res1)
}
