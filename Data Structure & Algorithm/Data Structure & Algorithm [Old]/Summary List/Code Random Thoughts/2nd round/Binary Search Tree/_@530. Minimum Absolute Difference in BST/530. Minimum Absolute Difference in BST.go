// 530. Minimum Absolute Difference in BST

// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

// Example 1:
// Input: root = [4,2,6,1,3]
// Output: 1

// Example 2:
// Input: root = [1,0,48,null,null,12,49]
// Output: 1

package main

import "math"

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func getMinimumDifference(root *TreeNode) int {
	result := make([]int, 0)
	minDiff := math.MaxInt

	if root == nil {
		return 0
	}

	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursion(node.Left)
		result = append(result, node.Val)
		recursion(node.Right)
	}

	recursion(root)

	for i := 1; i < len(result); i++ {
		if result[i]-result[i-1] < minDiff {
			minDiff = result[i] - result[i-1]
		}
	}

	return minDiff
}
