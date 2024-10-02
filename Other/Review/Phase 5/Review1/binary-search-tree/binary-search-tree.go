package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

type BinarySearchTree struct {
	root *TreeNode
}

// NewTreeNode is a constructor for TreeNode
func NewTreeNode(val int) *TreeNode {
	return &TreeNode{Val: val, Left: nil, Right: nil}
}

// NewBinarySearchTree is a constructor for BinarySearchTree
func NewBinarySearchTree(node *TreeNode) *BinarySearchTree {
	return &BinarySearchTree{root: node}
}

func (bst *BinarySearchTree) SearchNode(value int) bool {
	var recursive func(node *TreeNode) bool
	recursive = func(node *TreeNode) bool {
		if node == nil {
			return false
		}

		if value < node.Val {
			return recursive(node.Left)
		} else if value > node.Val {
			return recursive(node.Right)
		} else {
			return true
		}
	}

	return recursive(bst.root)
}

func (bst *BinarySearchTree) InsertNode(newValue int) bool {

	if bst.root == nil {
		bst.root = NewTreeNode(newValue)
		return true
	}

	var recursive func(node *TreeNode) bool
	recursive = func(node *TreeNode) bool {

		if newValue < node.Val {
			if node.Left == nil {
				node.Left = NewTreeNode(newValue)
				return true
			}
			return recursive(node.Left)
		} else if newValue > node.Val {
			if node.Right == nil {
				node.Right = NewTreeNode(newValue)
				return true
			}
			return recursive(node.Right)
		} else {
			return false
		}
	}

	return recursive(bst.root)
}

func (bst *BinarySearchTree) DeleteNode(value int) bool {
	var recursive func(node *TreeNode, parent *TreeNode) bool
	recursive = func(node *TreeNode, parent *TreeNode) bool {
		if node == nil {
			return false
		}

		if value < node.Val {
			return recursive(node.Left, node)
		} else if value > node.Val {
			return recursive(node.Right, node)
		} else {
			if node.Left == nil || node.Right == nil {
				var child *TreeNode
				if node.Left != nil {
					child = node.Left
				} else {
					child = node.Right
				}

				if parent.Left == nil {
					bst.root = child
				} else if parent.Left == node {
					parent.Left = child
				} else {
					parent.Right = child
				}
			} else {
				currentMinNode := node.Right
				parentNode := node

				for currentMinNode.Left != nil {
					parentNode = currentMinNode
					currentMinNode = currentMinNode.Left
				}

				node.Val = currentMinNode.Val

				if parentNode.Left == currentMinNode {
					parentNode.Left = currentMinNode.Right
				} else {
					parentNode.Right = currentMinNode.Right
				}
			}

			return true
		}
	}

	return recursive(bst.root, nil)
}

func (bst *BinarySearchTree) Preorder() []int {
	res := make([]int, 0)

	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}

		res = append(res, node.Val)
		recursive(node.Left)
		recursive(node.Right)
	}

	recursive(bst.root)
	return res
}

func (bst *BinarySearchTree) Inorder() []int {
	res := make([]int, 0)

	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursive(node.Left)
		res = append(res, node.Val)
		recursive(node.Right)
	}

	recursive(bst.root)
	return res
}

func (bst *BinarySearchTree) Postorder() []int {
	res := make([]int, 0)

	var recursive func(node *TreeNode)
	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursive(node.Left)
		recursive(node.Right)
		res = append(res, node.Val)
	}

	recursive(bst.root)
	return res
}

// test
func main() {
	tree := NewBinarySearchTree(nil)
	tree.InsertNode(8)
	tree.InsertNode(14)
	tree.InsertNode(10)
	tree.InsertNode(13)
	tree.InsertNode(3)
	tree.InsertNode(1)
	tree.InsertNode(6)
	tree.InsertNode(4)
	tree.InsertNode(7)
	insert_res1 := tree.Preorder()
	fmt.Println(insert_res1)
	search_res1 := tree.SearchNode(14)
	fmt.Println(search_res1)
	search_res2 := tree.SearchNode(5)
	fmt.Println(search_res2)

	tree.DeleteNode(8)
	delete_res1 := tree.Preorder()
	fmt.Println(delete_res1)

	tree.DeleteNode(3)
	delete_res2 := tree.Preorder()
	fmt.Println(delete_res2)
}
