// 404. Sum of Left Leaves

// Given the root of a binary tree, return the sum of all left leaves.

// A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 24
// Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.

// Example 2:
// Input: root = [1]
// Output: 0

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func sumOfLeftLeaves(root *TreeNode) int {
	sum := 0

	if root == nil {
		return 0
	}

	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if node == nil {
			return
		}

		if node.Left != nil {
			if node.Left.Left == nil && node.Left.Right == nil {
				sum += node.Left.Val
			}
		}

		recursion(node.Left)
		recursion(node.Right)
	}

	recursion(root)

	return sum
}
