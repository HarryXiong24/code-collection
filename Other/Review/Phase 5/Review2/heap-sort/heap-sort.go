package main

import "fmt"

func heapify(nums []int, length int, current_index int) {
	max_index := current_index
	left_index := 2*current_index + 1
	right_index := 2*current_index + 2

	if left_index < length && nums[max_index] < nums[left_index] {
		max_index = left_index
	}
	if right_index < length && nums[max_index] < nums[right_index] {
		max_index = right_index
	}

	if current_index != max_index {
		temp := nums[current_index]
		nums[current_index] = nums[max_index]
		nums[max_index] = temp
		heapify(nums, length, max_index)
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
