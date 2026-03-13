package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring. A well-formed parentheses string is one that follows these rules:

// Open brackets must be closed by a matching pair in the correct order.
// For example, given the string "(()", the longest valid parentheses substring is "()", which has a length of 2. Another example is the string ")()())", where the longest valid parentheses substring is "()()", which has a length of 4.

// Example 1:
// Inputs:
// s = "())))"
// Output:
// 2
// (Explanation: The longest valid parentheses substring is "()")

// Example 2:
// Inputs:
// s = "((()()())"
// Output:
// 8
// (Explanation: The longest valid parentheses substring is "(()()())" with a length of 8)

// Example 3:
// Inputs:
// s = ""
// Output:
// 0

func longest_valid_parentheses(s string) int {

	// the rule is that we can calculate count by using currentIndex - unmatchedIndex
	stack := []int{-1} // we use -1 as a placeholder, stack contains unmatchedIndexes
	count := 0

	for index, char := range s {
		if char == '(' {
			stack = append(stack, index)
		} else if char == ')' {
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				// it means that we have a possible match, so we calculate the length
				count = max(count, index-stack[len(stack)-1])
			} else {
				// push the unmatched index into stack
				stack = append(stack, index)
			}
		}
	}

	return count
}

// test
func main() {
	fmt.Println(longest_valid_parentheses("())))"))
	fmt.Println(longest_valid_parentheses("((()()())"))
	fmt.Println(longest_valid_parentheses("()(()"))
	fmt.Println(longest_valid_parentheses("()()"))
	fmt.Println(longest_valid_parentheses(""))
}
