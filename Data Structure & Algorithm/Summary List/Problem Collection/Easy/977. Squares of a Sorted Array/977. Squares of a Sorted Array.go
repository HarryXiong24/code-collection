// 977. Squares of a Sorted Array

// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:
// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

// Example 2:
// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]

package main

import (
	"fmt"
	"math"
)

func sortedSquares(nums []int) []int {
	left := 0
	right := len(nums) - 1
	current := right
	squares := make([]int, len(nums))

	for left <= right {
		if math.Abs(float64(nums[right])) >= math.Abs(float64(nums[left])) {
			squares[current] = int(math.Pow(float64(nums[right]), 2))
			current--
			right--
		} else {
			squares[current] = int(math.Pow(float64(nums[left]), 2))
			current--
			left++
		}
	}

	return squares
}

func main() {
	res := sortedSquares([]int{-4, -1, 0, 3, 10})
	fmt.Println(res)
}
