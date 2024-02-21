package main

import "fmt"

func heapify(nums []int, length int, currentIndex int) {
	largestIndex := currentIndex
	left := 2*currentIndex + 1
	right := 2*currentIndex + 2

	if left < length && nums[left] > nums[largestIndex] {
		largestIndex = left
	}
	if right < length && nums[right] > nums[largestIndex] {
		largestIndex = right
	}

	if largestIndex != currentIndex {
		temp := nums[largestIndex]
		nums[largestIndex] = nums[currentIndex]
		nums[currentIndex] = temp
		heapify(nums, length, largestIndex)
	}
}

func heapSort(nums []int) {
	for i := len(nums)/2 - 1; i >= 0; i-- {
		heapify(nums, len(nums), i)
	}

	for i := len(nums) - 1; i >= 0; i-- {
		temp := nums[i]
		nums[i] = nums[0]
		nums[0] = temp
		heapify(nums, i, 0)
	}
}

// test
func main() {
	array := []int{2, 0, 2, 1, 1, 0, -3, -4}
	heapSort(array)
	fmt.Println(array)
}
