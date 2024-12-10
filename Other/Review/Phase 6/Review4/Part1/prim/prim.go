package main

import (
	"fmt"
	"sort"
)

func prim(graph [][]int, vertices int) (int, [][]int) {
	mst := make([][]int, 0, vertices-1)
	cost := 0

	count := vertices - 1
	queue := make([][]int, 0)
	visited := make([]bool, vertices)

	// init
	for _, item := range graph {
		if item[0] == 0 || item[1] == 0 {
			queue = append(queue, item)
		}
	}
	visited[0] = true

	for count > 0 && len(queue) > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i][2] < queue[j][2]
		})

		current := queue[0]
		queue = queue[1:]

		u, v, weight := current[0], current[1], current[2]

		if !visited[u] || !visited[v] {
			cost += weight
			mst = append(mst, []int{u, v})
			count--

			var nextNode int
			if !visited[u] {
				nextNode = u
			} else {
				nextNode = v
			}
			visited[nextNode] = true

			for _, item := range graph {
				if (item[0] == nextNode && !visited[item[1]]) || (item[1] == nextNode && !visited[item[0]]) {
					queue = append(queue, item)
				}
			}
		}
	}

	return cost, mst
}

// test
func main() {
	cost, mst := prim(
		[][]int{
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
		},
		5,
	)
	fmt.Println(cost, mst)
}
