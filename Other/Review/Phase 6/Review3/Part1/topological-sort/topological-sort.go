package main

import "fmt"

type Color int

const (
	White Color = iota // non-access
	Gray
	Black // both itself and its adjacent nodes were accessed
)

type Graph struct {
	vertices     int
	adjacentList map[int][]int
}

func New(size int) *Graph {
	return &Graph{
		vertices:     size,
		adjacentList: make(map[int][]int, 0),
	}
}

func (graph *Graph) AddEdge(v int, w int) {
	if _, ok := graph.adjacentList[v]; !ok {
		graph.adjacentList[v] = make([]int, 0)
	}
	graph.adjacentList[v] = append(graph.adjacentList[v], w)
}

func (graph *Graph) TopologicalSort() []int {
	stack := make([]int, 0)
	visited := make([]Color, graph.vertices)

	var recursion func(vertex int) bool
	recursion = func(vertex int) bool {
		visited[vertex] = Gray

		if _, ok := graph.adjacentList[vertex]; ok {
			for _, neighbor := range graph.adjacentList[vertex] {
				if visited[neighbor] == Gray {
					return true
				}
				if visited[neighbor] == White && recursion(neighbor) {
					return true
				}
			}
		}

		stack = append(stack, vertex)
		visited[vertex] = Black
		return false
	}

	for i := 0; i < graph.vertices; i++ {
		if visited[i] == White {
			if recursion(i) == true {
				return nil
			}
		}
	}

	for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
		stack[i], stack[j] = stack[j], stack[i]
	}

	return stack
}

// test
func main() {
	graph1 := New(6)
	graph1.AddEdge(5, 2)
	graph1.AddEdge(5, 0)
	graph1.AddEdge(4, 0)
	graph1.AddEdge(4, 1)
	graph1.AddEdge(2, 3)
	graph1.AddEdge(3, 1)

	result1 := graph1.TopologicalSort()
	fmt.Println(result1) // [5, 4, 2, 3, 1, 0]

	graph2 := New(6)
	graph2.AddEdge(5, 2)
	graph2.AddEdge(5, 0)
	graph2.AddEdge(4, 0)
	graph2.AddEdge(4, 1)
	graph2.AddEdge(2, 3)
	graph2.AddEdge(3, 1)
	graph2.AddEdge(1, 2)

	result := graph2.TopologicalSort()
	fmt.Println(result) // []
}
