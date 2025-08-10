// 101. Symmetric Tree

// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

// Example 1:
// Input: root = [1,2,2,3,4,4,3]
// Output: true

// Example 2:
// Input: root = [1,2,2,null,3,null,3]
// Output: false

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isSymmetric(root *TreeNode) bool {
	if root == nil {
		return true
	}

	var recursion func(left *TreeNode, right *TreeNode) bool
	recursion = func(left *TreeNode, right *TreeNode) bool {
		if left == nil && right == nil {
			return true
		} else if left != nil && right == nil {
			return false
		} else if left == nil && right != nil {
			return false
		} else {
			if left.Val != right.Val {
				return false
			}
			return recursion(left.Left, right.Right) && recursion(left.Right, right.Left)
		}
	}

	return recursion(root.Left, root.Right)
}
