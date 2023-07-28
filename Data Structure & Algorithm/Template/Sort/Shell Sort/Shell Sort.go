package main

import "fmt"

func shellSort(nums []int) []int {
	gap := len(nums) / 2

	for gap > 0 {
		for i := gap; i < len(nums); i++ {
			temp := nums[i]
			j := i
			for j >= gap && nums[j-gap] > temp {
				nums[j] = nums[j-gap]
				j = j - gap
			}
			nums[j] = temp
		}
		gap = gap / 2
	}

	return nums
}

// test
func main() {
	res := shellSort([]int{10, 1, 3, 2, 9, 1, 5, 6})
	fmt.Println(res)
}
