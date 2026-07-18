package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to return the length of the longest substring in a provided string s where all characters in the substring are distinct.

// Example 1:
// Input:
// s = "eghghhgg"
// Output:
// 3
// The longest substring without repeating characters is "egh" with length of 3.

// Example 2:
// Input:
// s = "substring"
// Output:
// 8
// The answer is "ubstring" with length of 8.

// Time Complexity: O(n), start and end pointer will each iterate through the string once.
// Space Complexity: O(n), where n is the length of the string.
func longestSubstringWithoutRepeat(s string) int {
	maxLength := 0
	dict := make(map[byte]int)

	start := 0
	for end := 0; end < len(s); end++ {
		dict[s[end]]++

		for dict[s[end]] > 1 {
			dict[s[start]]--
			start++
		}

		maxLength = max(maxLength, end-start+1)

	}

	return maxLength
}

// best solution
// above one does up to ~2n operations (start may step one-by-one when shrinking).
// this one does ~n operations (start jumps directly to lastIndex+1 on duplicate).
func longestSubstringWithoutRepeatBest(s string) int {
	maxLength := 0
	// in this dict, value is the current index of that character in the string
	dict := make(map[byte]int)

	start := 0
	for end := 0; end < len(s); end++ {
		if lastIndex, exists := dict[s[end]]; exists {
			start = max(start, lastIndex+1)
		}

		dict[s[end]] = end
		maxLength = max(maxLength, end-start+1)
	}

	return maxLength
}

// test
func main() {
	s := "eghghhgg"
	fmt.Println(longestSubstringWithoutRepeat(s))
	fmt.Println(longestSubstringWithoutRepeatBest(s))
}
