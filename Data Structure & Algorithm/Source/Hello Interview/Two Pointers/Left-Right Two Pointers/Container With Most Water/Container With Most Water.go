package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Given an array heights where each element represents the height of a vertical line, pick two lines to form a container. Return the maximum area (amount of water) the container can hold.

// What is area? Width × height, where width is the distance between walls, and height is the shorter wall (water overflows at the shorter wall).

// Example 1:
// heights = [3, 4, 1, 2, 2, 4, 1, 3, 2]
// Output: 21  # walls at indices 0 and 7 (both height 3): width=7, height=3, area=21
// Example 2:

// heights = [1, 2, 1]
// Output: 2  # walls at indices 0 and 2: width=2, height=min(1,1)=1, area=2

// Time Complexity: O(n)
// Space Complexity: O(1)
func max_area(heights []int) int {
	left := 0
	right := len(heights) - 1
	maxArea := 0 // set initial value to 0, 0 is the minimal value (area is non-negative)

	for left < right {
		// get the current area (width = right-left, height = min of two walls)
		curArea := (right - left) * min(heights[left], heights[right])
		if curArea > maxArea {
			maxArea = curArea
		}

		// compare 2 sides, move the smaller one because smaller one is the height
		// so that move the smaller one to find a taller one
		// (moving the taller one only shrinks width without gaining height—the shorter wall remains the bottleneck)
		if heights[left] > heights[right] {
			right--
		} else {
			left++
		}
	}

	return maxArea
}

// test (runs the examples from the description above)
func main() {
	heights := []int{3, 4, 1, 2, 2, 4, 1, 3, 2}
	res := max_area(heights)
	fmt.Println(res)

	heights = []int{1, 2, 1}
	res = max_area(heights)
	fmt.Println(res)
}
