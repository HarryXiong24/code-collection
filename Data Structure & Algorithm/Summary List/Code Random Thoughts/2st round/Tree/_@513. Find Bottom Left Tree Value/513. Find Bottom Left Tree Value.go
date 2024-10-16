// 513. Find Bottom Left Tree Value

// Given the root of a binary tree, return the leftmost value in the last row of the tree.

// Example 1:
// Input: root = [2,1,3]
// Output: 1

// Example 2:
// Input: root = [1,2,3,4,null,5,6,null,null,7]
// Output: 7

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func findBottomLeftValue(root *TreeNode) int {
	res := 0

	if root == nil {
		return -1
	}

	queue := make([]*TreeNode, 0)
	queue = append(queue, root)

	for len(queue) > 0 {
		size := len(queue)

		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]

			if i == 0 {
				res = current.Val
			}

			if current.Left != nil {
				queue = append(queue, current.Left)
			}

			if current.Right != nil {
				queue = append(queue, current.Right)
			}
		}
	}

	return res
}

func findBottomLeftValue_Recursion(root *TreeNode) int {
	maxDepth := 0
	res := 0

	if root == nil {
		return -1
	}

	var recursion func(node *TreeNode, depth int)
	recursion = func(node *TreeNode, depth int) {
		if node.Left == nil && node.Right == nil {
			// this is make sure that the element is the leftmost, because the rest element's depth will be equal to depth
			if depth > maxDepth {
				maxDepth = depth
				res = node.Val
			}
			return
		}

		if node.Left != nil {
			recursion(node.Left, depth+1)
		}

		if node.Right != nil {
			recursion(node.Right, depth+1)
		}
	}

	recursion(root, 1)

	return res
}
