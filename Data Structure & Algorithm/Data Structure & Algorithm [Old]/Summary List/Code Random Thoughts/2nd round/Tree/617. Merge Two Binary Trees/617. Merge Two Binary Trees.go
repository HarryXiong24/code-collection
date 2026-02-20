// 617. Merge Two Binary Trees

// You are given two binary trees root1 and root2.

// Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

// Return the merged tree.

// Note: The merging process must start from the root nodes of both trees.

// Example 1:
// Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
// Output: [3,4,5,5,4,null,7]

// Example 2:
// Input: root1 = [1], root2 = [1,2]
// Output: [2,2]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {

	if root1 == nil && root2 == nil {
		return nil
	}
	if root1 == nil && root2 != nil {
		return root2
	}
	if root1 != nil && root2 == nil {
		return root1
	}

	var recursion func(node1 *TreeNode, node2 *TreeNode) *TreeNode
	recursion = func(node1 *TreeNode, node2 *TreeNode) *TreeNode {
		if node1 == nil && node2 == nil {
			return nil
		}
		if node1 == nil && node2 != nil {
			return node2
		}
		if node1 != nil && node2 == nil {
			return node1
		}

		node1.Val = node1.Val + node2.Val
		if node1.Left == nil && node2.Left != nil {
			node1.Left = node2.Left
		} else {
			node1.Left = recursion(node1.Left, node2.Left)
		}

		if node1.Right == nil && node2.Right != nil {
			node1.Right = node2.Right
		} else {
			node1.Right = recursion(node1.Right, node2.Right)
		}

		return node1
	}

	return recursion(root1, root2)
}
