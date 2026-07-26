package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to find the length of the longest substring containing the same letter in a given string s, after performing at most k operations in which you can choose any character of the string and change it to any other uppercase English letter.

// Input:

// s = "BBABCCDD"
// k = 2
// Output:
// 5
// Explanation: Replace the first 'A' and 'C' with 'B' to form "BBBBBCDD". The longest substring with identical letters is "BBBBB", which has a length of 5.

// Time Complexity: O(n)
// Space Complexity: O(1), since the map never contains more than 26 keys.
func characterReplacement(s string, k int) int {
	// k + the frequency of the most frequent character in the substring must be greater than or equal to the length of the substring.
	// if not, we need to shrink the window from the left.

	charCount := make(map[byte]int)
	maxFreq := 0
	maxLength := 0
	start := 0

	for end := 0; end < len(s); end++ {
		ch := s[end]
		charCount[ch]++
		if charCount[ch] > maxFreq {
			maxFreq = charCount[ch] // find the most frequent character in the substring
		}
		// if the condition is not met, we need to shrink the window from the left.
		for (end-start+1)-maxFreq > k {
			leftChar := s[start]
			charCount[leftChar]--
			start++
		}
		if end-start+1 > maxLength {
			maxLength = end - start + 1
		}
	}
	return maxLength
}

// test
func main() {
	s := "BCBABCCCCA"
	k := 2
	fmt.Println(characterReplacement(s, k))
}
