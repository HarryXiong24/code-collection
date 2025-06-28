package main

import (
	"fmt"
)

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

func (graph *Graph) TopologicalSortDFS() []int {
	stack := make([]int, 0, graph.vertices)
	inDegree := make(map[int]int, 0)
	visited := make([]Color, graph.vertices)

	// init
	for i := 0; i < graph.vertices; i++ {
		inDegree[i] = 0
		visited[i] = White
		if _, exist := graph.adjacentList[i]; !exist {
			graph.adjacentList[i] = make([]int, 0)
		}
	}

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
		if visited[i] == White && inDegree[i] == 0 {
			if recursion(i) {
				return nil
			}
		}
	}

	// Reverse the stack to get the topological sort order
	for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
		stack[i], stack[j] = stack[j], stack[i]
	}

	if graph.vertices == len(stack) {
		return stack
	}
	return nil
}

func (graph *Graph) TopologicalSortBFS() []int {
	result := make([]int, 0)
	inDegree := make(map[int]int, 0)
	queue := make([]int, 0)

	// init
	for i := 0; i < graph.vertices; i++ {
		inDegree[i] = 0
		if _, exist := graph.adjacentList[i]; !exist {
			graph.adjacentList[i] = make([]int, 0)
		}
	}

	for _, toList := range graph.adjacentList {
		for _, to := range toList {
			inDegree[to] = inDegree[to] + 1
		}
	}

	for item, degree := range inDegree {
		if degree == 0 {
			queue = append(queue, item)
		}
	}

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		result = append(result, current)

		for _, neighbor := range graph.adjacentList[current] {
			inDegree[neighbor] = inDegree[neighbor] - 1
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	if graph.vertices == len(result) {
		return result
	}
	return nil
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

	result1 := graph1.TopologicalSortDFS()
	fmt.Println(result1) // [5, 4, 2, 3, 1, 0]
	result11 := graph1.TopologicalSortBFS()
	fmt.Println(result11) // [5, 4, 2, 3, 1, 0]

	graph2 := New(6)
	graph2.AddEdge(5, 2)
	graph2.AddEdge(5, 0)
	graph2.AddEdge(4, 0)
	graph2.AddEdge(4, 1)
	graph2.AddEdge(2, 3)
	graph2.AddEdge(3, 1)
	graph2.AddEdge(1, 2)

	result2 := graph2.TopologicalSortDFS()
	fmt.Println(result2) // []
	result22 := graph2.TopologicalSortBFS()
	fmt.Println(result22) // []
}
