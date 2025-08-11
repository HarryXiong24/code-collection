package main

import (
	"fmt"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func preorder(root *TreeNode) []int {
	result := []int{}
	stack := []*TreeNode{}

	if root == nil {
		return result
	}

	stack = append(stack, root)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		result = append(result, current.Val)

		if current.Right != nil {
			stack = append(stack, current.Right)
		}

		if current.Left != nil {
			stack = append(stack, current.Left)
		}
	}

	return result
}

func postorder(root *TreeNode) []int {
	result := []int{}
	stack := []*TreeNode{}

	if root == nil {
		return result
	}

	stack = append(stack, root)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		result = append(result, current.Val)

		if current.Left != nil {
			stack = append(stack, current.Left)
		}

		if current.Right != nil {
			stack = append(stack, current.Right)
		}
	}

	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
}

func inorder(root *TreeNode) []int {
	result := []int{}
	stack := []*TreeNode{}

	if root == nil {
		return result
	}

	node := root

	for node != nil || len(stack) > 0 {
		if node != nil {
			stack = append(stack, node)
			node = node.Left
		} else {
			node = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			result = append(result, node.Val)
			node = node.Right
		}
	}

	return result
}

// test
func main() {
	root := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val: 2,
			Left: &TreeNode{
				Val:   4,
				Left:  nil,
				Right: nil,
			},
			Right: &TreeNode{
				Val:   5,
				Left:  nil,
				Right: nil,
			},
		},
		Right: &TreeNode{
			Val: 3,
			Left: &TreeNode{
				Val: 6,
				Left: &TreeNode{
					Val:   7,
					Left:  nil,
					Right: nil,
				},
			},
			Right: nil,
		},
	}

	res1 := preorder(root)
	res2 := postorder(root)
	res3 := inorder(root)
	fmt.Println(res1)
	fmt.Println(res2)
	fmt.Println(res3)
}
