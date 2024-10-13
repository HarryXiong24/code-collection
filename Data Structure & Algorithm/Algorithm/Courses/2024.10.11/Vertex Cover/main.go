package main

import (
	"fmt"
)

// Graph is an adjacency list representation of a graph
type Graph map[int][]int

// VertexCoverGreedy finds a vertex cover of at least k size using a greedy approach
func VertexCoverGreedy(graph Graph, k int) []int {
	edges := make(map[[2]int]bool)
	cover := []int{}

	// Collect all edges in the graph
	for u, neighbors := range graph {
		for _, v := range neighbors {
			if u < v {
				edges[[2]int{u, v}] = true
			} else {
				edges[[2]int{v, u}] = true
			}
		}
	}

	// Greedily add vertices to the cover
	for len(edges) > 0 {
		// Pick any edge from the map
		var u, v int
		for edge := range edges {
			u, v = edge[0], edge[1]
			break
		}

		// Add both vertices to the cover
		cover = append(cover, u, v)

		// Remove all edges connected to u or v
		for _, neighbor := range graph[u] {
			delete(edges, [2]int{u, neighbor})
			delete(edges, [2]int{neighbor, u})
		}
		for _, neighbor := range graph[v] {
			delete(edges, [2]int{v, neighbor})
			delete(edges, [2]int{neighbor, v})
		}
	}

	if len(cover) >= k {
		return cover[:k]
	}

	return []int{-1} // Return -1 if the cover size is less than k
}

// Main function with testing cases
func main() {
	// Example graph
	graph := Graph{
		1: {2, 3},
		2: {1, 4, 5},
		3: {1, 2, 6, 7},
		4: {2, 7},
		5: {2, 7},
		6: {3, 7},
		7: {3, 5, 6},
	}

	// Testing Vertex Cover
	vc := VertexCoverGreedy(graph, 3)
	fmt.Println("Vertex Cover:", vc)
}
