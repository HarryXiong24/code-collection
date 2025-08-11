package main

import "fmt"

func nextGreaterElement(nums []int) []int {
	result := make([]int, len(nums))
	for key := range result {
		result[key] = -1
	}
	monotonicStack := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		for len(monotonicStack) > 0 && nums[monotonicStack[len(monotonicStack)-1]] < nums[i] {
			top := monotonicStack[len(monotonicStack)-1]
			monotonicStack = monotonicStack[0 : len(monotonicStack)-1]
			result[top] = nums[i]
		}
		monotonicStack = append(monotonicStack, i)
	}

	return result
}

// test
func main() {
	nums := []int{2, 1, 2, 4, 3}
	fmt.Println(nextGreaterElement(nums)) // [4, 2, 4, -1, -1]
}
