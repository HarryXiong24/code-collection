// 5. Longest Palindromic Substring

// Given a string s, return the longest
// palindromic substring in s.

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Example 2:
// Input: s = "cbbd"
// Output: "bb"

package main

import "fmt"

// Find the longest palindrome in s with s[l] and s[r] as the center
func palindrome(s string, left int, right int) string {
	// Prevent index out of bounds
	for left >= 0 && right < len(s) && s[left] == s[right] {
		// Two pointers, expand to both sides
		left--
		right++
	}
	// Return the longest palindrome with s[l] and s[r] as the center
	return s[left+1 : right]
}

func longestPalindrome(s string) string {
	var res string
	for i := 0; i < len(s); i++ {
		// the longest palindromic substring centered at s[i]
		s1 := palindrome(s, i, i)
		// the longest palindromic substring centered at s[i] and s[i+1]
		s2 := palindrome(s, i, i+1)
		// res = longest(res, s1, s2)
		if len(res) < len(s1) {
			res = s1
		}
		if len(res) < len(s2) {
			res = s2
		}
	}
	return res
}

// test
func main() {
	res := longestPalindrome("babad")
	fmt.Println(res)
}
