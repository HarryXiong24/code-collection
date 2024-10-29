package main

import (
	"fmt"
	"sort"
)

func prim(graph [][]int, vertices int) (int, [][]int) {
	mst := make([][]int, 0, vertices-1)
	cost := 0

	count := vertices - 1
	visited := make([]bool, vertices)
	queue := make([][]int, 0)

	for key, value := range graph {
		if graph[key][0] == 0 || graph[key][1] == 0 {
			queue = append(queue, value)
		}
	}
	visited[0] = true

	for count > 0 {
		sort.Slice(queue, func(i, j int) bool {
			return queue[i][2] < queue[j][2]
		})

		current := queue[0]
		queue = queue[1:]

		v, w, weight := current[0], current[1], current[2]

		if visited[v] == false || visited[w] == false {
			mst = append(mst, []int{v, w})
			cost += weight
			count--

			var nextNode int
			if visited[v] == false {
				nextNode = v
			} else {
				nextNode = w
			}
			visited[nextNode] = true

			for key, value := range graph {
				if (graph[key][0] == nextNode && visited[graph[key][1]] == false) || (graph[key][1] == nextNode && visited[graph[key][0]] == false) {
					queue = append(queue, value)
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
