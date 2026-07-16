// 283. Move Zeroes

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

// Example 1:
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// Example 2:
// Input: nums = [0]
// Output: [0]

package main

import "fmt"

func moveZeroes(nums []int) {
	slow := 0
	fast := 0

	for fast < len(nums) {
		if nums[fast] != 0 {
			temp := nums[fast]
			nums[fast] = nums[slow]
			nums[slow] = temp
			slow++
		}
		fast++
	}
}

// test
func main() {
	arr := []int{0, 1, 0, 3, 12}
	moveZeroes(arr)
	fmt.Println(arr)
}
