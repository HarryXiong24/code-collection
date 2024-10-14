// 98. Validate Binary Search Tree

// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:
// Input: root = [2,1,3]
// Output: true

// Example 2:
// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
	result := make([]int, 0)

	if root == nil {
		return true
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
		if result[i-1] >= result[i] {
			return false
		}
	}

	return true
}
