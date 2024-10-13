// 106. Construct Binary Tree from Inorder and Postorder Traversal

// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// Example 1:
// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]

// Example 2:
// Input: inorder = [-1], postorder = [-1]
// Output: [-1]

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func NewTreeNode(val int, left *TreeNode, right *TreeNode) *TreeNode {
	return &TreeNode{
		Val:   val,
		Left:  left,
		Right: right,
	}
}

func indexOf(slice []int, element int) int {
	for i, v := range slice {
		if v == element {
			return i
		}
	}
	return -1
}

func buildTree(inorder []int, postorder []int) *TreeNode {

	if len(inorder) == 0 || len(postorder) == 0 {
		return nil
	}

	var recursion func(inorder []int, postorder []int) *TreeNode
	recursion = func(inorder, postorder []int) *TreeNode {
		if len(inorder) == 0 || len(postorder) == 0 {
			return nil
		}

		nodeValue := postorder[len(postorder)-1]
		postorder = postorder[0 : len(postorder)-1]

		node := NewTreeNode(nodeValue, nil, nil)

		index := indexOf(inorder, nodeValue)

		// in Typescript code, we just pass in postorder to the recursion. because in go, slice is just a copy of original slice, so postorder[len(postorder)-1] in left and right will pop 20 at the same time.
		// so in go, the order of node.Right and node.Left is not important.
		node.Right = recursion(inorder[index+1:], postorder[index:])
		node.Left = recursion(inorder[0:index], postorder[:index])

		return node
	}

	return recursion(inorder, postorder)
}
