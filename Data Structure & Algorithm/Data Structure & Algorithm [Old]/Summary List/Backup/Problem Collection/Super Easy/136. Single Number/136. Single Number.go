// 136. Single Number

// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:
// Input: nums = [2,2,1]
// Output: 1

// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4

// Example 3:
// Input: nums = [1]
// Output: 1

package main

import "fmt"

func singleNumber(nums []int) int {
	set := make(map[int]int)

	for _, item := range nums {
		current, ok := set[item]
		if ok == true {
			delete(set, item)
		} else {
			set[item] = current + 1
		}
	}

	for item := range set {
		return item
	}
	return -1
}

// test
func main() {
	arr := []int{4, 1, 2, 1, 2}
	res := singleNumber(arr)
	fmt.Println(res)
}
