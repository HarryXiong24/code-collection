package main

import (
	"fmt"
	"math"
)

func countingSort(nums []int) []int {
	min := nums[0]
	for i := 0; i < len(nums); i++ {
		if min > nums[i] {
			min = nums[i]
		}
	}

	mapper := 0

	if min < 0 {
		mapper = int(math.Abs(float64(0 - min)))
	} else {
		mapper = 0
	}

	for i := 0; i < len(nums); i++ {
		nums[i] = nums[i] + mapper
	}

	max := nums[0]
	for i := 0; i < len(nums); i++ {
		if max < nums[i] {
			min = nums[i]
		}
	}
	countArray := make([]int, max+1)

	for i := 0; i < len(nums); i++ {
		countArray[nums[i]] = countArray[nums[i]] + 1
	}

	sum := 0
	temp := 0
	for i := 0; i < len(countArray); i++ {
		sum = sum + temp
		temp = countArray[i]
		countArray[i] = sum
	}

	sortedArray := make([]int, len(nums))
	for i := 0; i < len(nums); i++ {
		index := countArray[nums[i]]
		value := nums[i]
		sortedArray[index] = value
		countArray[nums[i]]++
	}

	for i := 0; i < len(sortedArray); i++ {
		sortedArray[i] = sortedArray[i] - mapper
	}

	return sortedArray
}

// test
func main() {
	array := []int{2, 0, 2, 1, 1, 0, -3, -4}
	res := countingSort(array)
	fmt.Println(res)
}
