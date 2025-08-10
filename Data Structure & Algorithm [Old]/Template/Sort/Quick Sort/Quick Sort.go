package main

import "fmt"

func quickSort(nums []int) []int {
	if len(nums) <= 1 {
		return nums
	}

	pivotIndex := len(nums) / 2
	pivot := nums[pivotIndex]
	smallArr := []int{}
	largeArr := []int{}

	for i := 0; i < len(nums); i++ {
		if i == pivotIndex {
			continue
		} else if nums[i] < pivot {
			smallArr = append(smallArr, nums[i])
		} else {
			largeArr = append(largeArr, nums[i])
		}
	}

	result := []int{}
	result = append(result, quickSort(smallArr)...)
	result = append(result, pivot)
	result = append(result, quickSort(largeArr)...)
	return result
}

// test
func main() {
	array := []int{2, 0, 2, 1, 1, 0, -3, -4}
	res := quickSort(array)
	fmt.Println(res)
}
