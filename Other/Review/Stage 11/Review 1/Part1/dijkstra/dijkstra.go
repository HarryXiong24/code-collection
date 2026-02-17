package main

import (
	"fmt"
	"math"
	"sort"
)

type Node struct {
	node     string
	distance float64
}

func dijkstra(graph map[string]map[string]float64, start, end string) ([]string, float64) {

	distanceMap := make(map[string]float64)
	predecessorMap := make(map[string]string)
	for node := range graph {
		distanceMap[node] = math.Inf(1)
		predecessorMap[node] = ""
	}
	distanceMap[start] = 0

	visited := make(map[string]bool)
	queue := []*Node{
		{start, float64(0)},
	}

	for len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i].distance < queue[j].distance
		})

		current_node, current_cost := queue[0].node, queue[0].distance
		queue = queue[1:]

		if _, exists := visited[current_node]; exists && visited[current_node] {
			continue
		}
		visited[current_node] = true

		neighbors := graph[current_node]
		for neighbor, weight := range neighbors {
			if current_cost+weight < distanceMap[neighbor] {
				distanceMap[neighbor] = current_cost + weight
				queue = append(queue, &Node{neighbor, current_cost + weight})
				predecessorMap[neighbor] = current_node
			}
		}
	}

	if distanceMap[end] == math.Inf(1) {
		return nil, math.Inf(1)
	}

	shortestPath := make([]string, 0)
	for curr := end; curr != ""; curr = predecessorMap[curr] {
		shortestPath = append(shortestPath, curr)
	}

	for i, j := 0, len(shortestPath)-1; i < j; i, j = i+1, j-1 {
		shortestPath[i], shortestPath[j] = shortestPath[j], shortestPath[i]
	}

	return shortestPath, distanceMap[end]
}

func main() {
	graph := map[string]map[string]float64{
		"A": {"B": 1, "C": 1, "D": 3},
		"B": {"A": 1, "D": 2, "E": 1},
		"C": {"A": 1, "D": 1},
		"D": {"A": 2, "B": 3, "C": 1, "E": 2},
		"E": {"B": 1, "D": 2},
	}
	path, cost := dijkstra(graph, "A", "E")
	fmt.Println(path, cost) // 可能输出 [A B E] 2
}
