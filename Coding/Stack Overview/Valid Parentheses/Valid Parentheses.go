package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given an input string s consisting solely of the characters '(', ')', '{', '}', '[' and ']', determine whether s is a valid string. A string is considered valid if every opening bracket is closed by a matching type of bracket and in the correct order, and every closing bracket has a corresponding opening bracket of the same type.

// Example 1:
// Inputs:
// s = "(){({})}"
// Output:
// True

// Example 2:
// Inputs:
// s = "(){({}})"
// Output:
// False

// Time Complexity: O(n)
// Space Complexity: O(n), because we are using a stack to store the characters
func isValid(s string) bool {

	dict := map[byte]byte{
		'}': '{',
		')': '(',
		']': '[',
	}

	stack := make([]byte, 0)

	for i := 0; i < len(s); i++ {
		value, exist := dict[s[i]]
		if !exist {
			stack = append(stack, s[i])
		} else {
			// handle case like )()())
			if len(stack) == 0 {
				return false
			}
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if top != value {
				return false
			}
		}
	}

	return len(stack) == 0
}

// test
func main() {
	fmt.Println(isValid("(){({})}"))
	fmt.Println(isValid("(){({}})"))
}
