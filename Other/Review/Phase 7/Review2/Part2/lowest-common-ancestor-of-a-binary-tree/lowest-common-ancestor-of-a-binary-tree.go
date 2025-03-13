// 236. Lowest Common Ancestor of a Binary Tree

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Example 1:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.

// Example 2:
// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according
// to the LCA definition.

// Example 3:
// Input: root = [1,2], p = 1, q = 2
// Output: 1

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}

	// return value is the result
	var recursion func(node *TreeNode) *TreeNode
	recursion = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}

		if p == nil || q == nil {
			return nil
		}

		if p.Val == node.Val || q.Val == node.Val {
			return node
		}

		left := recursion(node.Left)
		right := recursion(node.Right)

		if left == nil && right == nil {
			return nil
		} else if left != nil && right == nil {
			return left
		} else if left == nil && right != nil {
			return right
		} else {
			return node
		}
	}

	return recursion(root)
}
