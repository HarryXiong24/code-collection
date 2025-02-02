// 110. Balanced Binary Tree

// Given a binary tree, determine if it is height-balanced.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: true

// Example 2:
// Input: root = [1,2,2,3,3,null,null,4,4]
// Output: false

// Example 3:
// Input: root = []
// Output: true

package main

import "math"

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func isBalanced(root *TreeNode) bool {
	if root == nil {
		return true
	}
	res := true

	var recursion func(node *TreeNode) int
	recursion = func(node *TreeNode) int {
		if node == nil {
			return 0
		}

		leftHeight := recursion(node.Left)
		rightHeight := recursion(node.Right)

		if math.Abs(float64(leftHeight-rightHeight)) > 1 {
			res = false
		}

		return max(leftHeight, rightHeight) + 1
	}

	recursion(root)

	return res
}
