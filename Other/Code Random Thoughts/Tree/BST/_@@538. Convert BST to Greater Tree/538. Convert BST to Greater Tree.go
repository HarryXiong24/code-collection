// 538. Convert BST to Greater Tree

// Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

// As a reminder, a binary search tree is a tree that satisfies these constraints:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:
// Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
// Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

// Example 2:
// Input: root = [0,null,1]
// Output: [1,null,1]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func convertBST(root *TreeNode) *TreeNode {

	if root == nil {
		return nil
	}

	pre := 0
	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursion(node.Right)
		node.Val = node.Val + pre
		pre = node.Val
		recursion(node.Left)
	}

	recursion(root)

	return root
}
