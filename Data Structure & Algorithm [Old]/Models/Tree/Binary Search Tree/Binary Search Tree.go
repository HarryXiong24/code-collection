// Binary Search Tree

package main

import (
	"fmt"
)

// TreeNode struct represents a node in the binary search tree
type TreeNode struct {
	val   int
	left  *TreeNode
	right *TreeNode
}

// BinarySearchTree struct represents the binary search tree
type BinarySearchTree struct {
	root *TreeNode
}

// NewTreeNode is a constructor for TreeNode
func NewTreeNode(val int) *TreeNode {
	return &TreeNode{
		val:   val,
		left:  nil,
		right: nil,
	}
}

// NewBinarySearchTree is a constructor for BinarySearchTree
func NewBinarySearchTree(node *TreeNode) *BinarySearchTree {
	return &BinarySearchTree{
		root: node,
	}
}

// searchNode searches for a node with a given value
func (bst *BinarySearchTree) searchNode(value int) bool {
	var recursive func(node *TreeNode) bool
	recursive = func(node *TreeNode) bool {
		if node == nil {
			return false
		}
		if value < node.val {
			return recursive(node.left)
		} else if value > node.val {
			return recursive(node.right)
		} else {
			return true
		}
	}
	return recursive(bst.root)
}

// insertNode inserts a new node with the given value
func (bst *BinarySearchTree) insertNode(newValue int) bool {
	if bst.root == nil {
		bst.root = NewTreeNode(newValue)
		return true
	}
	var recursive func(node *TreeNode) bool
	recursive = func(node *TreeNode) bool {
		if newValue < node.val {
			if node.left == nil {
				node.left = NewTreeNode(newValue)
				return true
			}
			return recursive(node.left)
		} else if newValue > node.val {
			if node.right == nil {
				node.right = NewTreeNode(newValue)
				return true
			}
			return recursive(node.right)
		} else {
			return false
		}
	}
	return recursive(bst.root)
}

// deleteNode deletes a node with the given value
func (bst *BinarySearchTree) deleteNode(value int) bool {
	var recursive func(node *TreeNode, parent *TreeNode) bool
	recursive = func(node *TreeNode, parent *TreeNode) bool {
		if node == nil {
			return false
		}
		if value < node.val {
			return recursive(node.left, node)
		} else if value > node.val {
			return recursive(node.right, node)
		} else {
			if node.left == nil || node.right == nil {
				var newChild *TreeNode
				if node.left == nil {
					newChild = node.right
				} else {
					newChild = node.left
				}
				if parent == nil {
					bst.root = newChild
				} else if parent.left == node {
					parent.left = newChild
				} else {
					parent.right = newChild
				}
			} else {
				minNode := node.right
				minNodeParent := node
				for minNode.left != nil {
					minNodeParent = minNode
					minNode = minNode.left
				}
				node.val = minNode.val
				if minNodeParent.left == minNode {
					minNodeParent.left = minNode.right
				} else {
					minNodeParent.right = minNode.right
				}
			}
			return true
		}
	}
	return recursive(bst.root, nil)
}

// preorder traversal of the tree
func (bst *BinarySearchTree) preorder() []int {
	res := []int{}
	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}
		res = append(res, node.val)
		recursive(node.left)
		recursive(node.right)
	}
	recursive(bst.root)
	return res
}

// inorder traversal of the tree
func (bst *BinarySearchTree) inorder() []int {
	res := []int{}
	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}
		recursive(node.left)
		res = append(res, node.val)
		recursive(node.right)
	}
	recursive(bst.root)
	return res
}

// postorder traversal of the tree
func (bst *BinarySearchTree) postorder() []int {
	res := []int{}
	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}
		recursive(node.left)
		recursive(node.right)
		res = append(res, node.val)
	}
	recursive(bst.root)
	return res
}

func main() {
	tree := NewBinarySearchTree(nil)
	tree.insertNode(8)
	tree.insertNode(14)
	tree.insertNode(10)
	tree.insertNode(13)
	tree.insertNode(3)
	tree.insertNode(1)
	tree.insertNode(6)
	tree.insertNode(4)
	tree.insertNode(7)
	insertRes1 := tree.preorder()
	fmt.Println(insertRes1)
	searchRes1 := tree.searchNode(14)
	fmt.Println(searchRes1)
	searchRes2 := tree.searchNode(5)
	fmt.Println(searchRes2)

	tree.deleteNode(8)
	deleteRes1 := tree.preorder()
	fmt.Println(deleteRes1)

	tree.deleteNode(3)
	deleteRes2 := tree.preorder()
	fmt.Println(deleteRes2)
}