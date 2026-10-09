package main

import (
	"fmt"
	"math"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given a sorted array nums, a target value target, and an integer k, find the k closest elements to target in the array, where "closest" is the absolute difference between each element and target. Return these elements in array, sorted in ascending order.

// Example 1:

// Inputs:

// nums = [-1, 0, 1, 4, 6]
// target = 1
// k = 3
// Output:

// [-1, 0, 1]
// Explanation: -1 is 2 away from 1, 0 is 1 away from 1, and 1 is 0 away from 1. All other elements are more than 2 away. Since we need to return the elements in ascending order, the answer is [-1, 0, 1]

// Example 2:

// Inputs:

// nums = [5, 6, 7, 8, 9]
// target = 10
// k = 2
// Output:

// [8, 9]

func heapify(nums [][]int, length int, currentIndex int) {
	maxIndex := currentIndex
	leftIndex := 2*currentIndex + 1
	rightIndex := 2*currentIndex + 2

	if leftIndex < length && nums[maxIndex][1] < nums[leftIndex][1] {
		maxIndex = leftIndex
	}
	if rightIndex < length && nums[maxIndex][1] < nums[rightIndex][1] {
		maxIndex = rightIndex
	}

	if currentIndex != maxIndex {
		temp := nums[currentIndex]
		nums[currentIndex] = nums[maxIndex]
		nums[maxIndex] = temp
		heapify(nums, length, maxIndex)
	}

}

func heapSort(nums [][]int) {
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

func kClosest(nums []int, k int, target int) []int {
	// Your code goes here
	heap := [][]int{}

	for _, num := range nums {
		distance := int(math.Abs(float64(target - num)))
		if len(heap) < k {
			heap = append(heap, []int{num, distance})
			heapify(heap, len(heap), len(heap)-1)
		} else if distance < heap[0][1] {
			heap[0] = []int{num, distance}
			heapify(heap, len(heap), 0)
		}
	}

	res := make([]int, k)
	for i := 0; i < k; i++ {
		res[i] = heap[i][0]
	}

	// Sort the result in ascending order
	sort.Ints(res)
	return res
}

func main() {
	// Example usage
	nums := []int{-1, 0, 1, 4, 6}
	target := 1
	k := 3
	result := kClosest(nums, k, target)
	fmt.Println(result)
}
