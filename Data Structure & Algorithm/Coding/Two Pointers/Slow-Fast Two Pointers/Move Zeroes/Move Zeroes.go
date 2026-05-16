package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given an integer array nums, write a function to rearrange the array by moving all zeros to the end while keeping the order of non-zero elements unchanged. Perform this operation in-place without creating a copy of the array.

// Input:
// nums = [2,0,4,0,9]
// Output:
// [2,4,9,0,0]

// it is not the best solution, but it is a good example of two pointers
// Time Complexity: O(n), but the worst case is O(n^2)
// Space Complexity: O(1)
func moveZeroes(nums []int) {
	left := 0
	right := left + 1

	for right < len(nums) {

		for nums[left] != 0 && right < len(nums)-1 {
			left++
			right = left + 1
		}

		if nums[right] != 0 && nums[left] == 0 {
			temp := nums[left]
			nums[left] = nums[right]
			nums[right] = temp
			left++
		}

		right++
	}
}

// this is the best solution
// Time Complexity: O(n)
// Space Complexity: O(1)
func moveZeroes2(nums []int) {
	slow := 0
	fast := 0

	for fast < len(nums) {
		if nums[fast] != 0 {
			nums[slow] = nums[fast]
			slow++
		}
		fast++
	}

	for slow < len(nums) {
		nums[slow] = 0
		slow++
	}
}

// this is the best solution
// Time Complexity: O(n)
// Space Complexity: O(1)
func moveZeroes3(nums []int) {
	nextNonZeroIndex := 0

	for i := 0; i < len(nums); i++ {
		if nums[i] != 0 {
			temp := nums[i]
			nums[i] = nums[nextNonZeroIndex]
			nums[nextNonZeroIndex] = temp
			nextNonZeroIndex++
		}
	}
}

// test
func main() {
	nums := []int{2, 0, 4, 0, 9}
	moveZeroes(nums)
	fmt.Println(nums)

	nums = []int{2, 0, 4, 0, 9}
	moveZeroes2(nums)
	fmt.Println(nums)
}
