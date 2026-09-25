package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Write a function that takes an array of unsorted integers nums and an integer k, and returns the kth largest element in the array. This function should run in O(n log k) time, where n is the length of the array.

// Example 1:
// Inputs:
// nums = [5, 3, 2, 1, 4]
// k = 2
// Output:
// 4

func heapify(nums []int, length int, currentIndex int) {
	maxIndex := currentIndex
	leftIndex := 2*currentIndex + 1
	rightIndex := 2*currentIndex + 2

	if leftIndex < length && nums[maxIndex] > nums[leftIndex] {
		maxIndex = leftIndex
	}
	if rightIndex < length && nums[maxIndex] > nums[rightIndex] {
		maxIndex = rightIndex
	}

	if currentIndex != maxIndex {
		temp := nums[currentIndex]
		nums[currentIndex] = nums[maxIndex]
		nums[maxIndex] = temp
		heapify(nums, length, maxIndex)
	}
}

func maxHeap(nums []int) {
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

// Time Complexity: O(n log n) where n is the length of the array
// Space Complexity: O(1) as we are sorting the array in place
func kthLargest(nums []int, k int) int {
	// Your code goes here
	maxHeap(nums)
	fmt.Println(nums)
	return nums[k-1]
}

func main() {
	// Example usage
	nums := []int{5, 3, 2, 1, 4}
	k := 2
	result := kthLargest(nums, k)
	println(result) // Output: 4

	nums2 := []int{3, 2, 3, 1, 2, 4, 5, 5, 6}
	result2 := kthLargest(nums2, 4)
	println(result2) // Output: 4
}

// Question 1: Walk me through your overall approach. What's the high-level idea behind your solution, and how does it get you the kth largest element?
// Answer 1: The high-level idea is to use a heap. The problem asks for O of n log k, and a heap gives us that, because each insert or removal costs log k. My implementation builds a max heap, then heap sorts the array in place, and I just index into it.

// Question 2: In heapify, you call heapify again at the end, after the swap. Why is that recursive call necessary?
// Answer 2: Because the heap has multiple levels, so one swap isn't enough. After I swap, the value I pushed down might still violate the heap property with its children. So I recurse until it's in the right place.

// Question 3: Your loop starts at length divided by two minus one rather than the last index. Why start there?
// Answer 3: Because leaf nodes have no children, so they already satisfy the heap property. We don't need to heapify them. Length divided by two minus one is the last non-leaf node, so that's where I start.
