// Prim's algorithm depends on the vertices of the graph, whereas Kruskal's algorithm depends on the edges.
// For a graph with relatively fewer edges (sparse graph), Kruskal's algorithm might be a better choice
// For a graph with many edges (dense graph), Prim's algorithm might be more efficient.

// O(E + V log V), E is # of edges, V is # of vertices
package main

import (
	"fmt"
	"sort"
)

// Prim implements Prim's algorithm
func Prim(edges [][]int, points int) (int, [][]int) {
	arr := [][]int{}
	visited := make([]bool, points)

	// Collect edges connected to the starting point (0)
	for _, edge := range edges {
		if edge[0] == 0 || edge[1] == 0 {
			arr = append(arr, edge)
		}
	}

	sort.Slice(arr, func(i, j int) bool {
		return arr[i][2] < arr[j][2]
	})

	count := points - 1
	res := 0
	visited[0] = true
	path := [][]int{}

	for len(arr) > 0 && count > 0 {
		current := arr[0]
		arr = arr[1:]

		point1, point2, weight := current[0], current[1], current[2]
		if !visited[point1] || !visited[point2] {
			res += weight
			path = append(path, []int{point1, point2})
			newPoint := point1
			if visited[point1] {
				newPoint = point2
			}
			visited[newPoint] = true

			// Update candidate edge set
			for _, edge := range edges {
				if (edge[0] == newPoint && !visited[edge[1]]) || (edge[1] == newPoint && !visited[edge[0]]) {
					arr = append(arr, edge)
				}
			}

			sort.Slice(arr, func(i, j int) bool {
				return arr[i][2] < arr[j][2]
			})
			count--
		}
	}

	return res, path
}

func main() {
	// Test
	res, path := Prim(
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
	fmt.Printf("Total cost: %d\n", res)
	fmt.Println("Minimum Spanning Tree:")
	for _, edge := range path {
		fmt.Println(edge)
	}
}