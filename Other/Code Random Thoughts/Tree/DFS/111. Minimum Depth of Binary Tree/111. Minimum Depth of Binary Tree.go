// 111. Minimum Depth of Binary Tree

// Given a binary tree, find its minimum depth.

// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

// Note: A leaf is a node with no children.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 2

// Example 2:
// Input: root = [2,null,3,null,4,null,5,null,6]
// Output: 5

// Constraints:
// The number of nodes in the tree is in the range [0, 105].
// -1000 <= Node.val <= 1000

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func minDepth(root *TreeNode) int {
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

			if current.Left == nil && current.Right == nil {
				return depth + 1
			}

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

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func minDepthDFS(root *TreeNode) int {

	if root == nil {
		return 0
	}

	var recursion func(node *TreeNode) int
	recursion = func(node *TreeNode) int {
		if node == nil {
			return 0
		}

		if node.Left != nil && node.Right == nil {
			return 1 + recursion(node.Left)
		}
		if node.Left == nil && node.Right != nil {
			return 1 + recursion(node.Right)
		}

		return min(recursion(node.Left), recursion(node.Right)) + 1
	}

	return recursion(root)
}
