package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given an integer array heights representing the heights of histogram bars, write a function to find the largest rectangular area possible in a histogram, where each bar's width is 1.

// Inputs:
// heights = [2,8,5,6,2,3]

// Output:
// 15

// Time Complexity: O(n)
// Space Complexity: O(n)
func largestRectangleArea(heights []int) int {
	// Your code goes here
	max_area := 0
	stack := []int{0}
	heights = append(heights, 0) // Add a sentinel value to pop all remaining bars in the stack

	for i := 1; i < len(heights); i++ {
		if heights[i] >= heights[stack[len(stack)-1]] {
			stack = append(stack, i)
		} else {
			for len(stack) > 0 && heights[i] < heights[stack[len(stack)-1]] {
				mid := stack[len(stack)-1]
				stack = stack[0 : len(stack)-1]

				left := 0
				if len(stack) > 0 {
					left = stack[len(stack)-1]
				} else {
					left = -1
				}

				right := i - 1
				h := heights[mid]
				w := right - left
				max_area = max(max_area, w*h)
			}
			stack = append(stack, i)
		}
	}

	return max_area
}

func main() {
	fmt.Println(largestRectangleArea([]int{2, 8, 5, 6, 2, 3}))
	fmt.Println(largestRectangleArea([]int{2, 1, 5, 6, 2, 3}))
}
