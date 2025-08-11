package main

import "fmt"

type TestNode struct {
	value     int
	neighbors []*TestNode
}

func BFS(root *TestNode) int {
	queue := []*TestNode{}
	depth := 0

	if root == nil {
		return depth
	}

	queue = append(queue, root)

	for len(queue) > 0 {

		size := len(queue)

		for i := 0; i < size; i++ {
			current := queue[0]
			queue = queue[1:]

			fmt.Println(current.value)

			for _, neighbor := range current.neighbors {
				queue = append(queue, neighbor)
			}
		}
		depth++
	}

	return depth
}

func DFS_Recursion(root *TestNode) {

	if root == nil {
		return
	}

	var recursion func(node *TestNode)
	recursion = func(node *TestNode) {
		if node == nil {
			return
		}

		fmt.Println(node.value)

		for _, neighbor := range node.neighbors {
			recursion(neighbor)
		}
	}

	recursion(root)
}

func DFS_Iteration(root *TestNode) {
	stack := []*TestNode{}

	if root == nil {
		return
	}

	stack = append(stack, root)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		fmt.Println(current.value)

		for _, neighbor := range current.neighbors {
			stack = append(stack, neighbor)
		}
	}
}

// test
func main() {
	root := TestNode{
		value: 1,
		neighbors: []*TestNode{
			{
				value: 2,
				neighbors: []*TestNode{
					{
						value:     4,
						neighbors: []*TestNode{},
					},
					{
						value:     5,
						neighbors: []*TestNode{},
					},
				},
			},
			{
				value: 3,
				neighbors: []*TestNode{
					{
						value: 6,
						neighbors: []*TestNode{
							{
								value:     7,
								neighbors: []*TestNode{},
							},
						},
					},
				},
			},
		},
	}

	// BFS
	res := BFS(&root)
	fmt.Println("layer: ", res)

	// DFS Recursion
	// fmt.Println("------")
	DFS_Recursion(&root)

	// // DFS Iteration
	// fmt.Println("------")
	DFS_Iteration(&root)
}
