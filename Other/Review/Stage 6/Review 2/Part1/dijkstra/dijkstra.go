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

	// init
	queue := make([]*Item, 0)
	visited := make(map[string]bool, 0)

	queue = append(queue, &Item{start, 0})
	dijkstraTable[start] = 0

	for len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i].cost < queue[j].cost
		})

		currentNode, currentCost := queue[0].node, queue[0].cost
		queue = queue[1:]

		if _, exists := visited[currentNode]; exists {
			continue
		}
		visited[currentNode] = true

		neighbors := graph[currentNode]
		for neighbor, weight := range neighbors {
			if currentCost+weight < dijkstraTable[neighbor] {
				dijkstraTable[neighbor] = currentCost + weight
				recordPath[neighbor] = currentNode
				queue = append(queue, &Item{neighbor, currentCost + weight})
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
