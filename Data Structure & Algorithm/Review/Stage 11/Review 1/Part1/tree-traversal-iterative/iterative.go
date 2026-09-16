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
	stack := []*TreeNode{}
	res := []int{}

	if root == nil {
		return res
	}
	stack = append(stack, root)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		res = append(res, current.Val)

		if current.Right != nil {
			stack = append(stack, current.Right)
		}
		if current.Left != nil {
			stack = append(stack, current.Left)
		}
	}

	return res
}

func postorder(root *TreeNode) []int {
	stack := []*TreeNode{}
	res := []int{}

	if root == nil {
		return res
	}
	stack = append(stack, root)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		res = append(res, current.Val)

		if current.Left != nil {
			stack = append(stack, current.Left)
		}

		if current.Right != nil {
			stack = append(stack, current.Right)
		}
	}

	for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
		temp := res[i]
		res[i] = res[j]
		res[j] = temp
	}

	return res
}

func inorder(root *TreeNode) []int {
	stack := []*TreeNode{}
	res := []int{}

	if root == nil {
		return res
	}
	node := root

	for len(stack) > 0 || node != nil {
		if node != nil {
			stack = append(stack, node)
			node = node.Left
		} else {
			current := stack[len(stack)-1]
			stack = stack[:len(stack)-1]

			res = append(res, current.Val)
			node = current.Right
		}
	}

	return res
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
