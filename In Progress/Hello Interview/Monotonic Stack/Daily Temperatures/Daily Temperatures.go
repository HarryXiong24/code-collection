package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given an integer array temps representing daily temperatures, write a function to calculate the number of days one has to wait for a warmer temperature after each given day. The function should return an array answer where answer[i] represents the wait time for a warmer day after the ith day. If no warmer day is expected in the future, set answer[i] to 0.

// Inputs:
// temps = [65, 70, 68, 60, 55, 75, 80, 74]
// Output:
// [1,4,3,2,1,1,0,0]

func dailyTemperatures(temps []int) []int {
	// Your code goes here
	result := make([]int, len(temps))
	stack := make([]int, 0)

	for i, item := range temps {
		for len(stack) > 0 && item > temps[stack[len(stack)-1]] {
			top := stack[len(stack)-1]
			stack = stack[0 : len(stack)-1]
			result[top] = i - top
		}
		stack = append(stack, i)
	}

	return result
}

// test
func main() {
	fmt.Println(dailyTemperatures([]int{65, 70, 68, 60, 55, 75, 80, 74}))
}
