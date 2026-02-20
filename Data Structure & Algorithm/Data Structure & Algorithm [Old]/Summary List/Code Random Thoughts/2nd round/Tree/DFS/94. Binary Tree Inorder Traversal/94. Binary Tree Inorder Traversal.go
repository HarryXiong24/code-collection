// 94. Binary Tree Inorder Traversal

// Given the root of a binary tree, return the inorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [1,3,2]

// Example 2:
// Input: root = []
// Output: []

// Example 3:
// Input: root = [1]
// Output: [1]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func inorderTraversal(root *TreeNode) []int {
	result := make([]int, 0)
	if root == nil {
		return result
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
	return result
}

func inorderTraversalIterative(root *TreeNode) []int {
	result := make([]int, 0)
	if root == nil {
		return result
	}

	node := root
	stack := make([]*TreeNode, 0)

	for node != nil || len(stack) > 0 {

		if node != nil {
			stack = append(stack, node)
			node = node.Left
		} else {
			node = stack[len(stack)-1]
			stack = stack[0 : len(stack)-1]
			result = append(result, node.Val)
			node = node.Right
		}
	}

	return result
}
