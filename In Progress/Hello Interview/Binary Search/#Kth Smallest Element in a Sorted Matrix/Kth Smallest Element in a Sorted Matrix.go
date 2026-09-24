package main

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

// Question 1: What's your overall strategy for this problem, and why binary search on the value range instead of sorting everything or using a min-heap?
// Answer 1: Both binary search and a min-heap work here. I went with binary search on the value range because it's basically constant space, and it runs in n log of the value range. The heap approach is k log n, which is fine too. Flattening and sorting is n squared log n, so that's clearly the worst of the three.

// Question 2: You start at the bottom-left corner. Walk me through what that loop is doing, and why starting from that corner works.
// Answer 2: So I start at the bottom-left corner. That corner is special because it's the smallest in its row but the largest in its column. If the current value is less than or equal to the target, then everything above it in that column is too, so I add row plus one to the count and move right. Otherwise the value's too big, which means nothing in this row from here on is less than or equal to the target, so I move up one row. Each step either moves right or up, so it's O of n total.

// Question 3: Why does returning left give you the correct answer, and why is that value guaranteed to exist in the matrix?
// Answer 3: If count is at least k, mid might be the answer, but there could be something smaller that also works, so I move right to mid minus one and keep searching lower. If count is less than k, we haven't hit k yet, so left goes to mid plus one. When the loop ends, left is the smallest value whose count is at least k. And that value has to be in the matrix, because if it weren't, the count wouldn't change at that point, so a smaller value would've had the same count and the search would've gone lower.

// Question 4: Why is it safe to use matrix zero zero and the bottom-right element as your search bounds?
// Answer 4: Because the matrix has structure. Every row and every column is sorted in ascending order, so the top-left element is the global minimum and the bottom-right is the global maximum. That means the answer has to fall somewhere in between, so those are the tightest bounds I can use.
