package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func recursive(inorder []int, postorder []int) *TreeNode {
	if len(postorder) <= 0 || len(inorder) <= 0 {
		return nil
	}

	currentVal := postorder[len(postorder)-1]
	currentIndex := 0
	for i, val := range inorder {
		if val == currentVal {
			currentIndex = i
			break
		}
	}

	node := &TreeNode{currentVal, nil, nil}

	leftpostorder := postorder[0:currentIndex]
	rightpostorder := postorder[currentIndex : len(postorder)-1]
	node.Right = recursive(inorder[currentIndex+1:], rightpostorder)
	node.Left = recursive(inorder[0:currentIndex], leftpostorder)

	return node
}

func buildTree(inorder []int, postorder []int) *TreeNode {
	return recursive(inorder, postorder)
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
	inorder := []int{9, 3, 15, 20, 7}
	postorder := []int{9, 15, 7, 20, 3}
	res := buildTree(inorder, postorder)
	printTree := levelOrder(res)
	fmt.Println(printTree)
}
