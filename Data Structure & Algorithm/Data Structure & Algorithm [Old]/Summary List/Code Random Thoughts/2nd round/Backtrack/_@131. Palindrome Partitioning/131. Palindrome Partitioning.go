// 131. Palindrome Partitioning

// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return all possible palindrome partitioning of s.

// Example 1:
// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]

// Example 2:
// Input: s = "a"
// Output: [["a"]]

package main

import (
	"fmt"
	"strings"
)

func isPalindrome(s string) bool {
	left := 0
	right := len(s) - 1

	for left < right {
		if s[left] != s[right] {
			return false
		}
		left++
		right--
	}

	return true
}

func partition(s string) [][]string {
	results := make([][]string, 0)
	arr := strings.Split(s, "")

	var backtrack func(startIndex int, path []string)
	backtrack = func(startIndex int, path []string) {

		if startIndex == len(s) {
			results = append(results, append([]string{}, path...))
			return
		}

		for i := startIndex; i < len(arr); i++ {
			temp := s[startIndex : i+1]
			if isPalindrome(temp) == false {
				continue
			}

			path = append(path, temp)
			backtrack(i+1, path)
			path = path[:len(path)-1]
		}
	}

	backtrack(0, []string{})

	return results
}

// test
func main() {
	res := partition("aab")
	fmt.Println(res)
}
