// 226. Invert Binary Tree

// Given the root of a binary tree, invert the tree, and return its root.

// Example 1:
// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]

// Example 2:
// Input: root = [2,1,3]
// Output: [2,3,1]

// Example 3:
// Input: root = []
// Output: []

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// post order
func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}

	var recursion func(node *TreeNode) *TreeNode
	recursion = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}

		left := recursion(node.Left)
		right := recursion(node.Right)

		node.Left = right
		node.Right = left

		return node
	}

	return recursion(root)
}

// pre order
func invertTree1(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}

	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if node == nil {
			return
		}

		temp := node.Left
		node.Left = node.Right
		node.Right = temp

		recursion(node.Left)
		recursion(node.Right)
	}

	recursion(root)

	return root
}
