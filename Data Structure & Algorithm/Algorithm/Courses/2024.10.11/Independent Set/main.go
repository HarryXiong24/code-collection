package main

import (
	"fmt"
)

// Graph is an adjacency list representation of a graph
type Graph map[int][]int

// IndependentSetGreedy finds an independent set of at least k size using a greedy approach
func IndependentSetGreedy(graph Graph, k int) []int {
	used := make(map[int]bool)
	independentSet := []int{}

	// Greedily add vertices to the independent set
	for u := range graph {
		if !used[u] {
			independentSet = append(independentSet, u)
			used[u] = true
			for _, neighbor := range graph[u] {
				used[neighbor] = true
			}
		}
	}

	if len(independentSet) >= k {
		return independentSet[:k]
	}

	return []int{-1} // Return -1 if the independent set size is less than k
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

	// Testing Independent Set
	is := IndependentSetGreedy(graph, 4)
	fmt.Println("Independent Set:", is)
}
