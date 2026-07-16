package main

import "fmt"

func nextGreaterElement(nums []int) []int {
	monotonicStack := make([]int, 0)
	results := make([]int, len(nums))

	for i := 0; i < len(nums); i++ {
		results[i] = -1
	}

	for i := 0; i < len(nums); i++ {
		for len(monotonicStack) > 0 && nums[monotonicStack[len(monotonicStack)-1]] < nums[i] {
			top := monotonicStack[len(monotonicStack)-1]
			monotonicStack = monotonicStack[:len(monotonicStack)-1]

			results[top] = nums[i]
		}
		monotonicStack = append(monotonicStack, i)
	}

	return results
}

// test
func main() {
	nums := []int{2, 1, 2, 4, 3}
	fmt.Println(nextGreaterElement(nums)) // [4, 2, 4, -1, -1]
}
