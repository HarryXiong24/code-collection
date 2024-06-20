package main

import (
	"container/heap"
	"fmt"
	"math"
)

// EdgeMap represents the edges and their weights
type EdgeMap map[string]int

// Graph represents the entire graph
type Graph map[string]EdgeMap

// Item represents a node in the priority queue
type Item struct {
	node string
	cost int
}

// PriorityQueue implements a priority queue
type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].cost < pq[j].cost
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
}

func (pq *PriorityQueue) Push(x interface{}) {
	item := x.(*Item)
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

// Dijkstra implements Dijkstra's algorithm
func Dijkstra(graph Graph, start, end string) ([]string, int) {
	dijkstraTable := make(map[string]int)
	recordPath := make(map[string]string)
	for node := range graph {
		dijkstraTable[node] = math.MaxInt32
		recordPath[node] = ""
	}

	dijkstraTable[start] = 0
	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Item{node: start, cost: 0})
	visited := make(map[string]bool)

	for pq.Len() > 0 {
		currentItem := heap.Pop(pq).(*Item)
		currentNode := currentItem.node
		currentCost := currentItem.cost

		if visited[currentNode] {
			continue
		}
		visited[currentNode] = true

		for neighbor, weight := range graph[currentNode] {
			if currentCost+weight < dijkstraTable[neighbor] {
				dijkstraTable[neighbor] = currentCost + weight
				recordPath[neighbor] = currentNode
				heap.Push(pq, &Item{node: neighbor, cost: currentCost + weight})
			}
		}
	}

	shortestPath := []string{}
	for node := end; node != ""; node = recordPath[node] {
		shortestPath = append([]string{node}, shortestPath...)
	}

	cost := dijkstraTable[end]
	if cost == math.MaxInt32 {
		return nil, -1 // No path found
	}
	return shortestPath, cost
}

func main() {
	graph := Graph{
		"A": {"B": 1, "C": 1, "D": 3},
		"B": {"A": 1, "D": 2, "E": 1},
		"C": {"A": 1, "D": 1},
		"D": {"A": 2, "B": 3, "C": 1, "E": 2},
		"E": {"B": 1, "D": 2},
	}
	res, cost := Dijkstra(graph, "A", "E")
	fmt.Printf("Shortest path: %v, cost: %d\n", res, cost)
}