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
	mst := make([][]int, 0, vertices-1) // pre-allocate space
	cost := 0

	// init
	uf := New(vertices)
	count := vertices - 1

	sort.Slice(graph, func(i int, j int) bool {
		return graph[i][2] < graph[j][2]
	})

	for count > 0 {
		v, w, weight := graph[0][0], graph[0][1], graph[0][2]
		graph = graph[1:]

		if uf.IsConnected(v, w) == false {
			cost += weight
			mst = append(mst, []int{v, w})

			uf.Union(v, w)
			count -= 1
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