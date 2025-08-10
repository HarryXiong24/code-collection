package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func recursive(preorder []int, inorder []int) *TreeNode {
	if len(preorder) <= 0 || len(inorder) <= 0 {
		return nil
	}

	currentVal := preorder[0]
	currentIndex := 0
	for i, val := range inorder {
		if val == currentVal {
			currentIndex = i
			break
		}
	}

	node := &TreeNode{currentVal, nil, nil}
	node.Left = recursive(preorder[1:currentIndex+1], inorder[0:currentIndex])
	node.Right = recursive(preorder[currentIndex+1:], inorder[currentIndex+1:])
	return node
}

func buildTree(preorder []int, inorder []int) *TreeNode {
	return recursive(preorder, inorder)
}

// test
func levelOrder(root *TreeNode) []int {
	res := []int{}
	queue := []*TreeNode{}

	if root == nil {
		return res
	}

	queue = append(queue, root)
	for len(queue) > 0 {
		size := len(queue)
		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]
			res = append(res, current.Val)
			if current.Left != nil {
				queue = append(queue, current.Left)
			}
			if current.Right != nil {
				queue = append(queue, current.Right)
			}
		}
	}

	return res
}

func main() {
	preorder := []int{3, 9, 20, 15, 7}
	inorder := []int{9, 3, 15, 20, 7}
	res := buildTree(preorder, inorder)
	printTree := levelOrder(res)
	fmt.Println(printTree)
}
