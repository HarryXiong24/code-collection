package main

import (
	"fmt"
)

func heapify(nums []int, length int, currentIndex int) {
	maxIndex := currentIndex
	leftIndex := 2*currentIndex + 1
	rightIndex := 2*currentIndex + 2

	if leftIndex < length && nums[maxIndex] < nums[leftIndex] {
		maxIndex = leftIndex
	}
	if rightIndex < length && nums[maxIndex] < nums[rightIndex] {
		maxIndex = rightIndex
	}

	if currentIndex != maxIndex {
		temp := nums[currentIndex]
		nums[currentIndex] = nums[maxIndex]
		nums[maxIndex] = temp
		heapify(nums, length, maxIndex)
	}
}

func heapSort(nums []int) {
	for i := len(nums)/2 - 1; i >= 0; i-- {
		heapify(nums, len(nums), i)
	}

	for i := len(nums) - 1; i >= 0; i-- {
		temp := nums[0]
		nums[0] = nums[i]
		nums[i] = temp
		heapify(nums, i, 0)
	}
}

// test
func main() {
	array := []int{2, 0, 2, 1, 1, 0, -3, -4}
	heapSort(array)
	fmt.Println(array)
}
