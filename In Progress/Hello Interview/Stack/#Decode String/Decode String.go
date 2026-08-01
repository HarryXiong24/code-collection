package main

import (
	"fmt"
	"strings"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given an encoded string, write a function to return its decoded string that follows a specific encoding rule: k[encoded_string], where the encoded_string within the brackets is repeated exactly k times. Note that k is always a positive integer. The input string is well-formed without any extra spaces, and square brackets are properly matched. Also, assume that the original data doesn't contain digits other than the ones that specify the number of times to repeat the following encoded_string.

// Inputs:
// s = "3[a2[c]]"
// Output:
// "accaccacc"

// Time Complexity: O(M), where M is the length of the decoded string
// Space Complexity: O(M), because we are using stacks to store the pieces
func decodeString(s string) string {
	numberStack := make([]int, 0)
	stringStack := make([]string, 0)
	// the number being built, pushed only when we hit '['
	num := 0

	for i := 0; i < len(s); i++ {
		c := s[i]

		if c >= '0' && c <= '9' {
			// keep accumulating, k can have more than one digit
			num = num*10 + int(c-'0')
		} else if c == '[' {
			numberStack = append(numberStack, num)
			num = 0
			stringStack = append(stringStack, "[")
		} else if c == ']' {
			// pop back to the matching '['
			j := len(stringStack) - 1
			for stringStack[j] != "[" {
				j--
			}
			temp := strings.Join(stringStack[j+1:], "")
			stringStack = stringStack[:j]

			count := numberStack[len(numberStack)-1]
			numberStack = numberStack[:len(numberStack)-1]

			// push the decoded piece back, so the outer bracket can repeat it
			stringStack = append(stringStack, strings.Repeat(temp, count))
		} else {
			stringStack = append(stringStack, string(c))
		}
	}

	return strings.Join(stringStack, "")
}

// test
func main() {
	fmt.Println(decodeString("3[a2[c]]"))
	fmt.Println(decodeString("2[abc]3[cd]ef"))
	fmt.Println(decodeString("12[a]"))
}
