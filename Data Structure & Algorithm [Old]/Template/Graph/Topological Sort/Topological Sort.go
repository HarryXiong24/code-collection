// Topological Sort

package main

import (
	"fmt"
)

type Color int

const (
	White Color = 0 // non-access
	Gray  Color = 1
	Black Color = 2 // both itself and its adjacent nodes were accessed
)

// Graph represents a directed graph using adjacency list representation
type Graph struct {
	vertices int
	adjList  map[int][]int
}

// NewGraph creates a new graph
func NewGraph(vertices int) *Graph {
	return &Graph{
		vertices: vertices,
		adjList:  make(map[int][]int),
	}
}

// AddEdge adds an edge to the graph
func (g *Graph) AddEdge(v, w int) {
	g.adjList[v] = append(g.adjList[v], w)
}

// TopologicalSort performs topological sort on the graph
func (g *Graph) TopologicalSort() []int {
	stack := []int{}
	visited := make([]Color, g.vertices)

	// Helper function to perform DFS
	var recursive func(vertex int) bool
	recursive = func(vertex int) bool {
		visited[vertex] = Gray

		for _, neighbor := range g.adjList[vertex] {
			if visited[neighbor] == Gray {
				return true // cycle detected
			}
			if visited[neighbor] == White && recursive(neighbor) {
				return true // cycle detected in recursion
			}
		}

		visited[vertex] = Black
		stack = append(stack, vertex)
		return false // no cycle
	}

	for i := 0; i < g.vertices; i++ {
		if visited[i] == White {
			if recursive(i) {
				return nil // cycle detected
			}
		}
	}

	// Reverse stack to get the right order
	for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
		stack[i], stack[j] = stack[j], stack[i]
	}

	return stack
}

func main() {
	graph1 := NewGraph(6)
	graph1.AddEdge(5, 2)
	graph1.AddEdge(5, 0)
	graph1.AddEdge(4, 0)
	graph1.AddEdge(4, 1)
	graph1.AddEdge(2, 3)
	graph1.AddEdge(3, 1)

	result1 := graph1.TopologicalSort()
	fmt.Println(result1) // [5, 4, 2, 3, 1, 0]

	graph2 := NewGraph(6)
	graph2.AddEdge(5, 2)
	graph2.AddEdge(5, 0)
	graph2.AddEdge(4, 0)
	graph2.AddEdge(4, 1)
	graph2.AddEdge(2, 3)
	graph2.AddEdge(3, 1)
	graph2.AddEdge(1, 2)

	result2 := graph2.TopologicalSort()
	fmt.Println(result2) // nil
}