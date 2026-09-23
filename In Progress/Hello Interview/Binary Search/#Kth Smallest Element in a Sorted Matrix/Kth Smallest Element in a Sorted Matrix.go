package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// You're given a square grid (n × n matrix) where each row is sorted in ascending order from left to right, and each column is also sorted in ascending order from top to bottom.

// Given the matrix and an integer k, find the k-th smallest element among all elements in the matrix.

// Note: k is 1-indexed, meaning k = 1 returns the smallest element.

// Example 1:

// Input:

// matrix = [
//     [ 1, 5, 9],
//     [10,11,13],
//     [12,13,15]]
// k = 8
// Output: 13

// Explanation: The elements in sorted order are [1,5,9,10,11,12,13,13,15]. The 8th smallest element is 13.

// Example 2:

// Input:

// matrix = [[-5]], k = 1
// Output: -5

// Explanation: The matrix has only one element, so it's the 1st smallest.

func countLessOrEqual(matrix [][]int, target int) int {
	count := 0
	row := len(matrix) - 1
	col := 0

	for row >= 0 && col < len(matrix) {
		if matrix[row][col] <= target {
			count += row + 1
			col++
		} else {
			row--
		}
	}

	return count

}

// Time Complexity: O(n log(max - min))
// Space Complexity: O(1)
func kthSmallest(matrix [][]int, k int) int {
	// Your code goes here

	left := matrix[0][0]
	right := matrix[len(matrix)-1][len(matrix)-1]

	for left <= right {
		mid := (left + right) / 2
		count := countLessOrEqual(matrix, mid)

		fmt.Println(right)

		if count >= k {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	return left
}

func main() {
	// Example usage
	matrix := [][]int{
		{1, 5, 9},
		{10, 11, 13},
		{12, 13, 15},
	}
	k := 8
	result := kthSmallest(matrix, k)
	println(result) // Output: 13
}
