// 104. Maximum Depth of Binary Tree

// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2

// Constraints:
// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func maxDepthBFS(root *TreeNode) int {
	depth := 0

	if root == nil {
		return depth
	}

	queue := make([]*TreeNode, 0)
	queue = append(queue, root)

	for len(queue) > 0 {
		size := len(queue)

		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]

			if current.Left != nil {
				queue = append(queue, current.Left)
			}

			if current.Right != nil {
				queue = append(queue, current.Right)
			}
		}
		depth++
	}

	return depth
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxDepthDFS(root *TreeNode) int {

	if root == nil {
		return 0
	}

	var recursion func(node *TreeNode) int
	recursion = func(node *TreeNode) int {
		if node == nil {
			return 0
		}

		return max(recursion(node.Left), recursion(node.Right)) + 1
	}

	return recursion(root)
}
