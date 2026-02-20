package main

import (
	"fmt"
)

// TreeNode represents a node in the AVL tree
type TreeNode struct {
	value  int
	height int
	left   *TreeNode
	right  *TreeNode
}

// AVLTree represents the AVL tree
type AVLTree struct {
	root *TreeNode
}

// NewAVLTree initializes a new AVL tree
func NewAVLTree() *AVLTree {
	return &AVLTree{}
}

// Insert inserts a new value into the AVL tree
func (tree *AVLTree) Insert(value int) {
	tree.root = tree.insertAtNode(tree.root, value)
}

// insertAtNode inserts a new value at the given node
func (tree *AVLTree) insertAtNode(node *TreeNode, value int) *TreeNode {
	if node == nil {
		return &TreeNode{value: value, height: 1}
	}

	if value < node.value {
		node.left = tree.insertAtNode(node.left, value)
	} else if value > node.value {
		node.right = tree.insertAtNode(node.right, value)
	} else {
		return node // Duplicate values are not inserted
	}

	node.height = 1 + max(tree.getHeight(node.left), tree.getHeight(node.right))

	// Balance the node
	return tree.balanceNode(node, value)
}

// balanceNode balances the given node
func (tree *AVLTree) balanceNode(node *TreeNode, value int) *TreeNode {
	balanceFactor := tree.getBalanceFactor(node)

	// Left Left Case
	if balanceFactor > 1 && value < node.left.value {
		return tree.rightRotate(node)
	}

	// Right Right Case
	if balanceFactor < -1 && value > node.right.value {
		return tree.leftRotate(node)
	}

	// Left Right Case
	if balanceFactor > 1 && value > node.left.value {
		node.left = tree.leftRotate(node.left)
		return tree.rightRotate(node)
	}

	// Right Left Case
	if balanceFactor < -1 && value < node.right.value {
		node.right = tree.rightRotate(node.right)
		return tree.leftRotate(node)
	}

	return node
}

// rightRotate performs a right rotation
func (tree *AVLTree) rightRotate(y *TreeNode) *TreeNode {
	x := y.left
	T2 := x.right

	x.right = y
	y.left = T2

	y.height = max(tree.getHeight(y.left), tree.getHeight(y.right)) + 1
	x.height = max(tree.getHeight(x.left), tree.getHeight(x.right)) + 1

	return x
}

// leftRotate performs a left rotation
func (tree *AVLTree) leftRotate(x *TreeNode) *TreeNode {
	y := x.right
	T2 := y.left

	y.left = x
	x.right = T2

	x.height = max(tree.getHeight(x.left), tree.getHeight(x.right)) + 1
	y.height = max(tree.getHeight(y.left), tree.getHeight(y.right)) + 1

	return y
}

// getHeight returns the height of the given node
func (tree *AVLTree) getHeight(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return node.height
}

// getBalanceFactor returns the balance factor of the given node
func (tree *AVLTree) getBalanceFactor(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return tree.getHeight(node.left) - tree.getHeight(node.right)
}

// Delete deletes a value from the AVL tree
func (tree *AVLTree) Delete(value int) {
	tree.root = tree.deleteNode(tree.root, value)
}

// deleteNode deletes a node with the given value
func (tree *AVLTree) deleteNode(node *TreeNode, value int) *TreeNode {
	if node == nil {
		return node
	}

	if value < node.value {
		node.left = tree.deleteNode(node.left, value)
	} else if value > node.value {
		node.right = tree.deleteNode(node.right, value)
	} else {
		// Node with one child or no child
		if node.left == nil || node.right == nil {
			var temp *TreeNode
			if node.left != nil {
				temp = node.left
			} else {
				temp = node.right
			}

			if temp == nil {
				temp = node
				node = nil
			} else {
				*node = *temp
			}
		} else {
			// Node with two children
			temp := tree.getMinValueNode(node.right)
			node.value = temp.value
			node.right = tree.deleteNode(node.right, temp.value)
		}
	}

	if node == nil {
		return node
	}

	node.height = 1 + max(tree.getHeight(node.left), tree.getHeight(node.right))

	// Balance the node
	return tree.balanceDeleteNode(node)
}

// balanceDeleteNode balances the node after deletion
func (tree *AVLTree) balanceDeleteNode(node *TreeNode) *TreeNode {
	balanceFactor := tree.getBalanceFactor(node)

	// Left Left Case
	if balanceFactor > 1 && tree.getBalanceFactor(node.left) >= 0 {
		return tree.rightRotate(node)
	}

	// Left Right Case
	if balanceFactor > 1 && tree.getBalanceFactor(node.left) < 0 {
		node.left = tree.leftRotate(node.left)
		return tree.rightRotate(node)
	}

	// Right Right Case
	if balanceFactor < -1 && tree.getBalanceFactor(node.right) <= 0 {
		return tree.leftRotate(node)
	}

	// Right Left Case
	if balanceFactor < -1 && tree.getBalanceFactor(node.right) > 0 {
		node.right = tree.rightRotate(node.right)
		return tree.leftRotate(node)
	}

	return node
}

// getMinValueNode finds the node with the minimum value
func (tree *AVLTree) getMinValueNode(node *TreeNode) *TreeNode {
	current := node
	for current.left != nil {
		current = current.left
	}
	return current
}

// PreOrderTraversal performs pre-order traversal of the AVL tree
func (tree *AVLTree) PreOrderTraversal() {
	tree.preOrderHelper(tree.root)
}

func (tree *AVLTree) preOrderHelper(node *TreeNode) {
	if node != nil {
		fmt.Println(node.value)
		tree.preOrderHelper(node.left)
		tree.preOrderHelper(node.right)
	}
}

// InOrderTraversal performs in-order traversal of the AVL tree
func (tree *AVLTree) InOrderTraversal() {
	tree.inOrderHelper(tree.root)
}

func (tree *AVLTree) inOrderHelper(node *TreeNode) {
	if node != nil {
		tree.inOrderHelper(node.left)
		fmt.Println(node.value)
		tree.inOrderHelper(node.right)
	}
}

// PostOrderTraversal performs post-order traversal of the AVL tree
func (tree *AVLTree) PostOrderTraversal() {
	tree.postOrderHelper(tree.root)
}

func (tree *AVLTree) postOrderHelper(node *TreeNode) {
	if node != nil {
		tree.postOrderHelper(node.left)
		tree.postOrderHelper(node.right)
		fmt.Println(node.value)
	}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	tree := NewAVLTree()
	tree.Insert(10)
	tree.Insert(20)
	tree.Insert(30)
	tree.Insert(40)
	tree.Insert(50)
	tree.Insert(25)

	fmt.Println("Pre-order traversal:")
	tree.PreOrderTraversal()

	fmt.Println("In-order traversal:")
	tree.InOrderTraversal()

	fmt.Println("Post-order traversal:")
	tree.PostOrderTraversal()

	tree.Delete(40)
	fmt.Println("After deleting 40:")
	fmt.Println("In-order traversal:")
	tree.InOrderTraversal()
}