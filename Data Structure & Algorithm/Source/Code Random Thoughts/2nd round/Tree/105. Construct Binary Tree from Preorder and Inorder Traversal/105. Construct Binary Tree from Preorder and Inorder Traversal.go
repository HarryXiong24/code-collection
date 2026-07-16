// 105. Construct Binary Tree from Preorder and Inorder Traversal

// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// Example 1:
// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]

// Example 2:
// Input: preorder = [-1], inorder = [-1]
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

func buildTree(preorder []int, inorder []int) *TreeNode {

	if len(inorder) == 0 || len(preorder) == 0 {
		return nil
	}

	var recursion func(preorder []int, inorder []int) *TreeNode
	recursion = func(preorder []int, inorder []int) *TreeNode {
		if len(inorder) == 0 || len(preorder) == 0 {
			return nil
		}

		nodeValue := preorder[0]
		preorder = preorder[1:]

		node := NewTreeNode(nodeValue, nil, nil)

		index := indexOf(inorder, nodeValue)

		// in Typescript code, we just pass in postorder to the recursion. because in go, slice is just a copy of original slice, so postorder[len(postorder)-1] in left and right will pop 20 at the same time.
		// so in go, the order of node.Right and node.Left is not important.
		node.Left = recursion(preorder[:index], inorder[0:index])
		node.Right = recursion(preorder[index:], inorder[index+1:])

		return node
	}

	return recursion(preorder, inorder)
}
