// 501. Find Mode in Binary Search Tree

// Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

// If the tree has more than one mode, return them in any order.

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than or equal to the node's key.
// The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:
// Input: root = [1,null,2,2]
// Output: [2]

// Example 2:
// Input: root = [0]
// Output: [0]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func findMode(root *TreeNode) []int {
	count := make(map[int]int)
	modes := make([]int, 0)

	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursion(node.Left)

		if _, exists := count[node.Val]; !exists {
			count[node.Val] = 0
		}
		count[node.Val] = count[node.Val] + 1

		recursion(node.Right)
	}

	recursion(root)

	maxCount := 0
	for _, value := range count {
		if value > maxCount {
			maxCount = value
		}
	}

	for key, value := range count {
		if value == maxCount {
			modes = append(modes, key)
		}
	}

	return modes
}
