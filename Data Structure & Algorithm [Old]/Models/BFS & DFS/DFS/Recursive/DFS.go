package main

import "fmt"

type TestNode struct {
	value     int
	neighbors []*TestNode
}

func recursive(node *TestNode) {
	if node == nil {
		return
	}
	fmt.Println(node.value)
	for _, next := range node.neighbors {
		recursive(next)
	}
}

func DFS_Recursive(root *TestNode) {
	recursive(root)
}

// test
func main() {

	node1 := TestNode{
		value:     1,
		neighbors: []*TestNode{},
	}
	node2 := TestNode{
		value:     2,
		neighbors: []*TestNode{},
	}
	node3 := TestNode{
		value:     3,
		neighbors: []*TestNode{},
	}
	node4 := TestNode{
		value:     4,
		neighbors: []*TestNode{},
	}
	node5 := TestNode{
		value:     5,
		neighbors: []*TestNode{},
	}
	node6 := TestNode{
		value:     6,
		neighbors: []*TestNode{},
	}
	node7 := TestNode{
		value:     7,
		neighbors: []*TestNode{},
	}

	node1.neighbors = append(node1.neighbors, &node2)
	node1.neighbors = append(node1.neighbors, &node3)
	node2.neighbors = append(node2.neighbors, &node4)
	node2.neighbors = append(node2.neighbors, &node5)
	node3.neighbors = append(node3.neighbors, &node6)
	node6.neighbors = append(node6.neighbors, &node7)

	DFS_Recursive(&node1)

}
