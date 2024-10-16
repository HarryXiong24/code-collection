// 701. Insert into a Binary Search Tree

// You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

// Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

// Example 1:
// Input: root = [4,2,7,1,3], val = 5
// Output: [4,2,7,1,3,5]
// Explanation: Another accepted tree is:

// Example 2:
// Input: root = [40,20,60,10,30,50,70], val = 25
// Output: [40,20,60,10,30,50,70,null,null,25]

// Example 3:
// Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
// Output: [4,2,7,1,3,5]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func NewTreeNode(val int) *TreeNode {
	return &TreeNode{
		Val:   val,
		Left:  nil,
		Right: nil,
	}
}

func insertIntoBST(root *TreeNode, val int) *TreeNode {
	if root == nil {
		root = NewTreeNode(val)
	}

	var recursion func(node *TreeNode)
	recursion = func(node *TreeNode) {
		if val < node.Val {
			if node.Left == nil {
				node.Left = NewTreeNode(val)
				return
			}
			recursion(node.Left)
		} else if val > node.Val {
			if node.Right == nil {
				node.Right = NewTreeNode(val)
				return
			}
			recursion(node.Right)
		} else {
			return
		}
	}

	recursion(root)

	return root
}
