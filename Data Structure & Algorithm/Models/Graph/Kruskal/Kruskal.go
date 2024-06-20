package main

import (
	"fmt"
	"sort"
)

// QuickUnion structure
type QuickUnion struct {
	root []int
	rank []int
}

// NewQuickUnion initializes a new QuickUnion structure
func NewQuickUnion(size int) *QuickUnion {
	root := make([]int, size)
	rank := make([]int, size)
	for i := 0; i < size; i++ {
		root[i] = i
		rank[i] = 1
	}
	return &QuickUnion{root, rank}
}

// Find finds the root of x
func (qu *QuickUnion) Find(x int) int {
	if x == qu.root[x] {
		return x
	}
	qu.root[x] = qu.Find(qu.root[x])
	return qu.root[x]
}

// Union connects x and y
func (qu *QuickUnion) Union(x, y int) {
	rootX := qu.Find(x)
	rootY := qu.Find(y)

	if rootX != rootY {
		if qu.rank[rootX] > qu.rank[rootY] {
			qu.root[rootY] = rootX
		} else if qu.rank[rootX] < qu.rank[rootY] {
			qu.root[rootX] = rootY
		} else {
			qu.root[rootY] = rootX
			qu.rank[rootX]++
		}
	}
}

// IsConnected checks if x and y are connected
func (qu *QuickUnion) IsConnected(x, y int) bool {
	return qu.Find(x) == qu.Find(y)
}

// Kruskal implements Kruskal's algorithm
func Kruskal(edges [][]int, points int) (int, [][]int) {
	quickUnion := NewQuickUnion(points)
	count := points - 1
	res := 0
	mst := [][]int{}

	sort.Slice(edges, func(i, j int) bool {
		return edges[i][2] < edges[j][2]
	})

	for len(edges) > 0 && count > 0 {
		current := edges[0]
		edges = edges[1:]

		if !quickUnion.IsConnected(current[0], current[1]) {
			res += current[2]
			quickUnion.Union(current[0], current[1])
			mst = append(mst, []int{current[0], current[1]})
			count--
		}
	}

	return res, mst
}

func main() {
	// Test
	edges := [][]int{
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
	res, mst := Kruskal(edges, 5)
	fmt.Printf("Total cost: %d\n", res)
	fmt.Println("Minimum Spanning Tree:")
	for _, edge := range mst {
		fmt.Println(edge)
	}
}