package main

import (
	"fmt"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given a list of points in the form [[x1, y1], [x2, y2], ... [xn, yn]] and an integer k, find the k closest points to the origin (0, 0) on the 2D plane.

// The distance between two points (x, y) and (a, b) is calculated using the formula:

// √(x1 - a2)2 + (y1 - b2)2
// Return the k closest points in any order.

// Example 1:

// Inputs:

// points = [[3,4],[2,2],[1,1],[0,0],[5,5]]
// k = 3
// Output:

// [[2,2],[1,1],[0,0]]
// Also valid:

// [[2,2],[0,0],[1,1]]
// [[1,1],[0,0],[2,2]]
// [[1,1],[2,2],[0,0]]
// ...
// [[0,0],[1,1],[2,2]]

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

// Time Complexity: O(n log n) where n is the length of the array
// Space Complexity: O(n) as we are creating a new array to store the distances
func kClosest(points [][]int, k int) [][]int {

	arr := [][]int{}
	for index, value := range points {
		distance := value[0]*value[0] + value[1]*value[1]
		arr = append(arr, []int{index, distance})
	}

	heapSort(arr)

	fmt.Println(arr)

	res := [][]int{}
	for i := 0; i < k; i++ {
		res = append(res, points[arr[i][0]])
	}

	return res
}

func main() {
	// Example usage
	points := [][]int{{3, 3}, {5, -1}, {-2, 4}}
	k := 2
	result := kClosest(points, k)
	fmt.Println(result)
}
