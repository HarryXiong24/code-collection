package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func preorderTraversalRecursive(root *TreeNode) []int {
	res := []int{}

	var recursive func(node *TreeNode)

	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}

		res = append(res, node.Val)
		recursive(node.Left)
		recursive(node.Right)
	}

	recursive(root)
	return res
}

// test
func main() {
	root := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val: 2,
			Left: &TreeNode{
				Val: 4,
			},
			Right: &TreeNode{
				Val: 5,
			},
		},
		Right: &TreeNode{
			Val: 3,
			Left: &TreeNode{
				Val: 6,
				Right: &TreeNode{
					Val: 7,
				},
			},
		},
	}

	res := preorderTraversalRecursive(root)
	fmt.Println(res)
}
