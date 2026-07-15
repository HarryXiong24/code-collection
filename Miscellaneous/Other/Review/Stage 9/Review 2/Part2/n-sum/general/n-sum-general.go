package main

import (
	"fmt"
	"sort"
)

func nSum(nums []int, n int, start int, target int) [][]int {
	var res [][]int

	if n < 2 || len(nums) < n {
		return res
	}

	if n == 2 {
		left := start
		right := len(nums) - 1

		for left < right {
			if nums[left]+nums[right] < target {
				left++
			} else if nums[left]+nums[right] > target {
				right--
			} else {
				res = append(res, []int{nums[left], nums[right]})

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

	} else {

		for i := start; i < len(nums); i++ {
			if i > start && nums[i-1] == nums[i] {
				continue
			}

			sub := nSum(nums, n-1, i+1, target-nums[i])

			for _, arr := range sub {
				res = append(res, append(arr, nums[i]))
			}
		}

	}
	return res
}

// test
func main() {
	arr := []int{1, 0, -1, 0, -2, 2}
	sort.Slice(arr, func(i, j int) bool {
		return arr[i] < arr[j]
	})
	res := nSum(arr, 4, 0, 0)
	fmt.Println(res)
}
