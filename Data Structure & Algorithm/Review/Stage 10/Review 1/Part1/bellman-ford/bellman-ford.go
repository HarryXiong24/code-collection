package main

import (
	"errors"
	"fmt"
	"math"
)

type EdgeMap map[string]float64
type Graph map[string]EdgeMap

// BellmanFord (SPFA-style).
func BellmanFord(g Graph, start, end string) ([]string, float64, error) {
	nodesSet := map[string]struct{}{}
	for u, em := range g {
		nodesSet[u] = struct{}{}
		for v := range em {
			nodesSet[v] = struct{}{}
		}
	}
	nodes := make([]string, 0, len(nodesSet))
	for v := range nodesSet {
		nodes = append(nodes, v)
	}

	if _, ok := nodesSet[start]; !ok {
		return []string{}, math.Inf(1), nil
	}

	dist := make(map[string]float64, len(nodesSet))
	prev := make(map[string]string, len(nodesSet))
	count := make(map[string]int, len(nodesSet))
	inQueue := make(map[string]bool, len(nodesSet))

	for v := range nodesSet {
		dist[v] = math.Inf(1)
	}
	dist[start] = 0

	queue := []string{start}
	inQueue[start] = true

	for len(queue) > 0 {
		// pop front
		u := queue[0]
		queue = queue[1:]
		inQueue[u] = false

		for v, w := range g[u] {
			if dist[u] != math.Inf(1) && dist[u]+w < dist[v] {
				dist[v] = dist[u] + w
				prev[v] = u

				count[v] = count[v] + 1
				if count[v] > len(nodes) {
					return nil, 0, errors.New("negative cycle detected (reachable from start)")
				}

				if !inQueue[v] {
					queue = append(queue, v)
					inQueue[v] = true
				}
			}
		}
	}

	if d, ok := dist[end]; !ok || math.IsInf(d, +1) {
		return []string{}, math.Inf(1), nil
	}

	path := make([]string, 0, len(nodes))
	for cur := end; ; {
		path = append(path, cur)
		p, has := prev[cur]
		if !has {
			break
		}
		cur = p
	}

	for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
		path[i], path[j] = path[j], path[i]
	}

	return path, dist[end], nil
}

// test
func main() {
	graph1 := Graph{
		"A": {"B": 1, "C": 1, "D": 3},
		"B": {"A": 1, "D": 2, "E": 1},
		"C": {"A": 1, "D": 1},
		"D": {"A": 2, "B": 3, "C": 1, "E": 2},
		"E": {"B": 1, "D": 2},
	}
	path, d, err := BellmanFord(graph1, "A", "E")
	fmt.Println("res1:", path, d, err) // 期望与 Dijkstra 在非负边图上一致

	graph2 := Graph{
		"S": {"A": 4, "B": 5},
		"A": {"C": -2},
		"B": {"C": 3},
		"C": {"T": 2},
		"T": {},
	}
	path, d, err = BellmanFord(graph2, "S", "T")
	fmt.Println("res2:", path, d, err) // 含负边但无负环

	graph3 := Graph{
		"X": {"Y": 1},
		"Y": {},
		"Z": {}, // isolated
	}
	path, d, err = BellmanFord(graph3, "X", "Z")
	fmt.Println("res3:", path, d, err) // 不可达 => [], +Inf, nil

	graph4 := Graph{
		"S": {"A": 1},
		"A": {"B": 1},
		"B": {"C": 1},
		"C": {"A": -4}, // 负环
	}
	path, d, err = BellmanFord(graph4, "S", "C")
	if err != nil {
		fmt.Println("res4 throws:", err)
	} else {
		fmt.Println("res4:", path, d)
	}
}
