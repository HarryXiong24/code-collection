// 450. Delete Node in a BST

// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:
// Search for a node to remove.
// If the node is found, delete the node.

// Example 1:
// Input: root = [5,3,6,2,4,null,7], key = 3
// Output: [5,4,6,2,null,null,7]
// Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
// One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
// Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

// Example 2:
// Input: root = [5,3,6,2,4,null,7], key = 0
// Output: [5,3,6,2,4,null,7]
// Explanation: The tree does not contain a node with value = 0.

// Example 3:
// Input: root = [], key = 0
// Output: []

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return root
	}

	var recursion func(node *TreeNode, parent *TreeNode)
	recursion = func(node *TreeNode, parent *TreeNode) {
		if node == nil {
			return
		}

		if key < node.Val {
			recursion(node.Left, node)
		} else if key > node.Val {
			recursion(node.Right, node)
		} else {
			if node.Left == nil || node.Right == nil {
				var childNode *TreeNode
				if node.Left != nil {
					childNode = node.Left
				} else {
					childNode = node.Right
				}

				if parent == nil {
					root = childNode
				} else if parent.Left == node {
					parent.Left = childNode
				} else {
					parent.Right = childNode
				}

			} else {

				curMinNode := node.Right
				parentNode := node

				for curMinNode.Left != nil {
					parentNode = curMinNode
					curMinNode = curMinNode.Left
				}

				node.Val = curMinNode.Val

				if parentNode.Left == curMinNode {
					parentNode.Left = curMinNode.Right
				} else {
					parentNode.Right = curMinNode.Right
				}
			}
		}
	}

	recursion(root, nil)

	return root
}
