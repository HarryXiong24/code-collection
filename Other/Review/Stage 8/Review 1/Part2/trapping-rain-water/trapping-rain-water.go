// 42. Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

package main

import (
	"fmt"
)

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func trap(height []int) int {
	sum := 0
	monotonicStack := make([]int, 0)
	monotonicStack = append(monotonicStack, 0)

	for i := 1; i < len(height); i++ {
		if height[monotonicStack[len(monotonicStack)-1]] >= height[i] {
			monotonicStack = append(monotonicStack, i)
		} else {
			for len(monotonicStack) > 0 && height[monotonicStack[len(monotonicStack)-1]] < height[i] {

				mid := monotonicStack[len(monotonicStack)-1]
				monotonicStack = monotonicStack[:len(monotonicStack)-1]

				if len(monotonicStack) > 0 {
					right := i
					left := monotonicStack[len(monotonicStack)-1]

					h := min(height[right], height[left]) - height[mid]
					w := right - left - 1

					sum += w * h
				}
			}
			monotonicStack = append(monotonicStack, i)
		}
	}

	return sum
}

// test
func main() {
	res := trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})
	fmt.Println(res)
}
