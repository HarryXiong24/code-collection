package main

import "math"

// DESCRIPTION (inspired by Leetcode.com)
// Given the root of a binary tree, write a recursive function to find its maximum depth, where maximum depth is defined as the number of nodes along the longest path from the root node down to a leaf node.

// Example 1:
// 4
// 2
// 1
// 8
// 7
// 6
// 9
// Input:
// [4, 2, 7, 1, null, 6, 9, null, 8, null, null, null, null, null, null]
// Output: 4 (The 4 nodes along the longest path are shown in bold)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// Time Complexity: O(n)
// Space Complexity: O(log n)
func maxDepth(root *TreeNode) int {
	// Your code goes here

	if root == nil {
		return 0
	}

	leftDepth := maxDepth(root.Left)
	rightDepth := maxDepth(root.Right)

	return int(math.Max(float64(leftDepth), float64(rightDepth))) + 1
}
