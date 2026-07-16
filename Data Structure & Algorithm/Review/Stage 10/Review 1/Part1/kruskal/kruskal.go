package main

import (
	"fmt"
	"sort"
)

type DisjointSet struct {
	root []int
}

func New(size int) *DisjointSet {
	root := make([]int, size)
	for i := 0; i < size; i++ {
		root[i] = i
	}

	return &DisjointSet{
		root: root,
	}
}

func (uf *DisjointSet) Find(x int) int {
	if x == uf.root[x] {
		return x
	}
	return uf.Find(uf.root[x])
}

func (uf *DisjointSet) Union(x int, y int) {
	rootX := uf.Find(x)
	rootY := uf.Find(y)

	if rootX != rootY {
		uf.root[rootY] = rootX
	}
}

func (uf *DisjointSet) IsConnected(x int, y int) bool {
	return uf.Find(x) == uf.Find(y)
}

func kruskal(graph [][]int, vertices int) (int, [][]int) {
	mst := make([][]int, 0, vertices-1)
	cost := 0

	uf := New(vertices)
	count := vertices - 1
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
			uf.Union(u, v)
			count--
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
