// 18. 4Sum

// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

// Example 1:
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// Example 2:
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]

package main

import (
	"fmt"
	"sort"
)

func fourSum(nums []int, target int) [][]int {
	result := [][]int{}
	sort.Ints(nums)

	for i := 0; i < len(nums); i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		for j := i + 1; j < len(nums); j++ {
			if j > i+1 && nums[j] == nums[j-1] {
				continue
			}

			left := j + 1
			right := len(nums) - 1

			for left < right {
				if nums[i]+nums[j]+nums[left]+nums[right] < target {
					left++
				} else if nums[i]+nums[j]+nums[left]+nums[right] > target {
					right--
				} else {
					result = append(result, []int{nums[i], nums[j], nums[left], nums[right]})

					for left < right && nums[left+1] == nums[left] {
						left++
					}

					for left < right && nums[right-1] == nums[right] {
						right--
					}

					left++
					right--
				}
			}
		}
	}

	return result
}

// test
func main() {

	res := fourSum([]int{1, 0, -1, 0, -2, 2}, 0)
	res1 := fourSum([]int{2, 2, 2, 2, 2}, 8)
	fmt.Println(res)
	fmt.Println(res1)
}
