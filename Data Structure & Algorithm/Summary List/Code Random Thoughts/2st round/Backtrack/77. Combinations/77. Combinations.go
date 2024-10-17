// 77. Combinations

// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

// Example 1:
// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// Explanation: There are 4 choose 2 = 6 total combinations.
// Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

// Example 2:
// Input: n = 1, k = 1
// Output: [[1]]
// Explanation: There is 1 choose 1 = 1 total combination.

package main

import "fmt"

func combine(n int, k int) [][]int {
	results := make([][]int, 0)

	var backtrack func(startIndex int, path []int)
	backtrack = func(startIndex int, path []int) {

		if len(path) == k {
			results = append(results, append([]int{}, path...))
			return
		}

		for i := startIndex; i <= n; i++ {
			path = append(path, i)
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}
	}

	backtrack(1, []int{})

	return results
}

// test
func main() {
	res := combine(4, 2)
	fmt.Println(res)
}
