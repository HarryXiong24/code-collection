package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func levelOrder(root *TreeNode) [][]int {
	res := [][]int{}
	queue := []*TreeNode{}

	if root == nil {
		return res
	}

	queue = append(queue, root)
	for len(queue) > 0 {
		size := len(queue)
		temp := []int{}
		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]
			temp = append(temp, current.Val)
			if current.Left != nil {
				queue = append(queue, current.Left)
			}
			if current.Right != nil {
				queue = append(queue, current.Right)
			}
		}
		res = append(res, temp)
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

	res := levelOrder(root)
	fmt.Println(res)
}
