// 700. Search in a Binary Search Tree

// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

// Example 1:
// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]

// Example 2:
// Input: root = [4,2,7,1,3], val = 5
// Output: []

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func searchBST(root *TreeNode, val int) *TreeNode {

	if root == nil {
		return nil
	}

	var recursion func(node *TreeNode) *TreeNode
	recursion = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}

		if val < node.Val {
			return recursion(node.Left)
		} else if val > node.Val {
			return recursion(node.Right)
		} else {
			return node
		}
	}

	return recursion(root)
}
