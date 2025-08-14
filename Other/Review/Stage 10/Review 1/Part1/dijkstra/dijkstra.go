package main

import (
	"fmt"
	"math"
	"sort"
)

func dijkstra(graph map[string]map[string]float64, start, end string) ([]string, float64) {

	distanceMap := make(map[string]float64)
	predecessorMap := make(map[string]string)
	for node := range graph {
		distanceMap[node] = math.Inf(1)
		predecessorMap[node] = ""
	}
	distanceMap[start] = 0

	visited := make(map[string]bool)
	queue := [][2]interface{}{{start, float64(0)}} // [节点, 距离]

	for len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i][1].(float64) < queue[j][1].(float64)
		})

		currentNode := queue[0][0].(string)
		currentCost := queue[0][1].(float64)
		queue = queue[1:]

		if visited[currentNode] {
			continue
		}
		visited[currentNode] = true

		for neighbor, weight := range graph[currentNode] {
			if currentCost+weight < distanceMap[neighbor] {
				distanceMap[neighbor] = currentCost + weight
				predecessorMap[neighbor] = currentNode
				queue = append(queue, [2]interface{}{neighbor, distanceMap[neighbor]})
			}
		}
	}

	if math.IsInf(distanceMap[end], 1) {
		return []string{}, math.Inf(1)
	}

	var shortestPath []string
	var getShortestPath func(string)
	getShortestPath = func(node string) {
		if node == "" {
			return
		}
		shortestPath = append(shortestPath, node)
		getShortestPath(predecessorMap[node])
	}
	getShortestPath(end)

	// 反转路径
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
