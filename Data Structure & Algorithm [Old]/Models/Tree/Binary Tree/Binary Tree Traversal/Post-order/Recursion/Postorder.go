package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func postorderTraversalRecursive(root *TreeNode) []int {
	res := []int{}

	var recursive func(node *TreeNode)

	recursive = func(node *TreeNode) {
		if node == nil {
			return
		}

		recursive(node.Left)
		recursive(node.Right)
		res = append(res, node.Val)
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
				Left: &TreeNode{
					Val: 7,
				},
			},
		},
	}

	res := postorderTraversalRecursive(root)
	fmt.Println(res)
}
