package main

import (
	"fmt"
	"math"
	"sort"
)

// EdgeMap represents the neighbors and their corresponding weights
type EdgeMap map[string]int

// Graph represents the whole graph where each node maps to its neighbors
type Graph map[string]EdgeMap

// queue's element
type Item struct {
	node string
	cost int
}

func dijkstra(graph Graph, start string, end string) ([]string, int) {
	dijkstraTable := make(EdgeMap)
	recordPath := make(map[string]string)

	for key := range graph {
		dijkstraTable[key] = math.MaxInt
		recordPath[key] = ""
	}

	queue := []*Item{
		{
			node: start,
			cost: 0,
		},
	}
	visited := make(map[string]bool)
	dijkstraTable[start] = 0

	for len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i].cost < queue[j].cost
		})

		current := queue[0]
		queue = queue[1:]

		current_node, current_cost := current.node, current.cost

		if _, exists := visited[current.node]; exists {
			continue
		}
		visited[current.node] = true

		for neighbor, weight := range graph[current_node] {
			if current_cost+weight < dijkstraTable[neighbor] {
				dijkstraTable[neighbor] = current_cost + weight
				queue = append(queue, &Item{
					node: neighbor,
					cost: current_cost + weight,
				})
				recordPath[neighbor] = current_node
			}
		}
	}

	shortestPath := []string{}
	var getShortestPath func(node string)
	getShortestPath = func(node string) {
		if node == "" {
			return
		}
		shortestPath = append(shortestPath, node)
		getShortestPath(recordPath[node])
	}

	getShortestPath(end)

	for i, j := 0, len(shortestPath)-1; i < j; i, j = i+1, j-1 {
		shortestPath[i], shortestPath[j] = shortestPath[j], shortestPath[i]
	}

	return shortestPath, dijkstraTable[end]
}

// test
func main() {
	graph := Graph{
		"A": {"B": 1, "C": 1, "D": 3},
		"B": {"A": 1, "D": 2, "E": 1},
		"C": {"A": 1, "D": 1},
		"D": {"A": 3, "B": 2, "C": 1, "E": 2},
		"E": {"B": 1, "D": 2},
	}

	result, cost := dijkstra(graph, "A", "E")
	fmt.Println("Shortest path:", result, "Cost:", cost)
}
