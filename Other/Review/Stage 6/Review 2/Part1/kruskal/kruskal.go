package main

import (
	"fmt"
	"sort"
)

type UnionFind struct {
	root []int
}

func New(size int) *UnionFind {
	root := make([]int, size)

	for i := 0; i < size; i++ {
		root[i] = i
	}

	return &UnionFind{
		root: root,
	}
}

func (uf *UnionFind) Find(x int) int {
	if uf.root[x] == x {
		return x
	}
	return uf.Find(uf.root[x])
}

func (uf *UnionFind) Union(x int, y int) {
	root_x := uf.Find(x)
	root_y := uf.Find(y)

	if root_x != root_y {
		uf.root[root_y] = root_x
	}
}

func (uf *UnionFind) IsConnected(x int, y int) bool {
	return uf.Find(x) == uf.Find(y)
}

func kruskal(graph [][]int, vertices int) (int, [][]int) {
	mst := make([][]int, 0, vertices-1)
	cost := 0

	count := vertices - 1
	uf := New(vertices)

	sort.Slice(graph, func(i, j int) bool {
		return graph[i][2] < graph[j][2]
	})

	for count > 0 {
		current := graph[0]
		graph = graph[1:]

		u, v, weight := current[0], current[1], current[2]

		if !uf.IsConnected(u, v) {
			cost += weight
			mst = append(mst, []int{u, v})
			count -= 1

			uf.Union(u, v)
		}
	}

	return cost, mst
}

// test
func main() {
	cost, mst := kruskal(
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
