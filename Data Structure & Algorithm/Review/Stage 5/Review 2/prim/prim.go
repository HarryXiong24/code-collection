package main

import (
	"fmt"
	"sort"
)

func prim(graph [][]int, vertices int) (int, [][]int) {
	mst := make([][]int, 0, vertices-1)
	cost := 0

	// init
	count := vertices - 1
	queue := make([][]int, 0, vertices-1)
	visited := make([]bool, vertices, vertices)
	for i := 0; i < vertices; i++ {
		visited[i] = false
	}

	for _, val := range graph {
		if val[0] == 0 || val[1] == 0 {
			queue = append(queue, val)
		}
	}
	visited[0] = true

	// loop
	for count > 0 {
		// sort
		sort.Slice(queue, func(i, j int) bool {
			return queue[i][2] < queue[j][2]
		})

		v, w, weight := queue[0][0], queue[0][1], queue[0][2]
		queue = queue[1:]

		if !visited[v] || !visited[w] {
			cost += weight
			mst = append(mst, []int{v, w})
			count -= 1

			var next_node int
			if visited[v] == false {
				next_node = v
			} else {
				next_node = w
			}
			visited[next_node] = true

			for _, val := range graph {
				if (val[0] == next_node && visited[val[1]] != true) || (val[1] == next_node && visited[val[0]] != true) {
					queue = append(queue, val)
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
