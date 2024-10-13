// 112. Path Sum

// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

// A leaf is a node with no children.

// Example 1:
// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.

// Example 2:
// Input: root = [1,2,3], targetSum = 5
// Output: false
// Explanation: There are two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.

// Example 3:
// Input: root = [], targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func hasPathSum(root *TreeNode, targetSum int) bool {
	res := false

	if root == nil {
		return false
	}

	var recursion func(node *TreeNode, sum int)
	recursion = func(node *TreeNode, sum int) {

		if node.Left == nil && node.Right == nil {
			sum += node.Val
			if sum == targetSum {
				res = res || true
			}
			return
		}

		sum += node.Val

		if node.Left != nil {
			recursion(node.Left, sum)
		}
		if node.Right != nil {
			recursion(node.Right, sum)
		}
	}

	recursion(root, 0)
	return res
}
