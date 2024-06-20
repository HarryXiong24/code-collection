package main

import (
	"fmt"
)

func nextGreaterElement(nums []int) []int {
	result := make([]int, len(nums))
	for i := range result {
		result[i] = -1
	}
	monotonicStack := []int{}

	for i := 0; i < len(nums); i++ {
		for len(monotonicStack) > 0 && nums[i] > nums[monotonicStack[len(monotonicStack)-1]] {
			index := monotonicStack[len(monotonicStack)-1]
			monotonicStack = monotonicStack[:len(monotonicStack)-1]
			result[index] = nums[i]
		}
		monotonicStack = append(monotonicStack, i)
	}

	return result
}

func main() {
	nums := []int{2, 1, 2, 4, 3}
	fmt.Println(nextGreaterElement(nums)) // [4, 2, 4, -1, -1]
}