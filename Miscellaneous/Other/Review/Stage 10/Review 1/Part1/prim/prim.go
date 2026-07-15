package main

import (
	"fmt"
	"sort"
)

func prim(graph [][]int, vertices int) (int, [][]int) {
	mst := [][]int{}
	cost := 0

	queue := [][]int{}
	visited := make(map[int]bool)
	count := vertices - 1

	// init
	for _, edge := range graph {
		if edge[0] == 0 || edge[1] == 0 {
			queue = append(queue, edge)
		}
	}
	visited[0] = true

	for count > 0 && len(queue) > 0 {
		// sort by weight
		sort.Slice(queue, func(i, j int) bool {
			return queue[i][2] < queue[j][2]
		})

		// pop front
		u, v, weight := queue[0][0], queue[0][1], queue[0][2]
		queue = queue[1:]

		if !visited[u] || !visited[v] {
			mst = append(mst, []int{u, v})
			cost += weight
			count--

			var next int
			if !visited[u] {
				next = u
			} else {
				next = v
			}
			visited[next] = true

			for _, edge := range graph {
				if (edge[0] == next && !visited[edge[1]]) ||
					(edge[1] == next && !visited[edge[0]]) {
					queue = append(queue, edge)
				}
			}
		}
	}

	return cost, mst
}

func main() {
	graph := [][]int{
		{0, 1, 4},
		{0, 2, 13},
		{0, 3, 7},
		{0, 4, 7},
		{1, 2, 9},
		{1, 3, 3},
		{1, 4, 7},
		{2, 3, 10},
		{2, 4, 14},
		{3, 4, 4},
	}

	cost, mst := prim(graph, 5)
	fmt.Println("Cost:", cost)
	fmt.Println("MST:", mst)
}
