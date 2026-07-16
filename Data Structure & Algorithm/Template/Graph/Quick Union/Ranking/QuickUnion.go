// Time Complexity	O(α(N))

// Note:
// N is the number of vertices in the graph.
// α refers to the Inverse Ackermann function.
// In practice, we assume it's a constant. In other words, O(α(N)) is regarded as O(1) on average.

// Space Complexity O(N)

package main

import "fmt"

// UnionFind structure
type UnionFind struct {
	root []int
	rank []int
}

// NewUnionFind initializes a new UnionFind structure
func NewUnionFind(size int) *UnionFind {
	root := make([]int, size)
	rank := make([]int, size)
	for i := range root {
		root[i] = i
		rank[i] = 1
	}
	return &UnionFind{root: root, rank: rank}
}

// Find finds the root of x with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.root[x] != x {
		uf.root[x] = uf.Find(uf.root[x])
	}
	return uf.root[x]
}

// Union unions two sets
func (uf *UnionFind) Union(x, y int) {
	rootX := uf.Find(x)
	rootY := uf.Find(y)
	if rootX != rootY {
		if uf.rank[rootX] > uf.rank[rootY] {
			uf.root[rootY] = rootX
		} else if uf.rank[rootX] < uf.rank[rootY] {
			uf.root[rootX] = rootY
		} else {
			uf.root[rootY] = rootX
			uf.rank[rootX]++
		}
	}
}

// Connected checks if two nodes are in the same set
func (uf *UnionFind) Connected(x, y int) bool {
	return uf.Find(x) == uf.Find(y)
}

func main() {
	uf := NewUnionFind(10)
	uf.Union(1, 2)
	uf.Union(2, 3)
	uf.Union(4, 5)
	uf.Union(6, 7)
	uf.Union(8, 9)
	uf.Union(1, 9)
	fmt.Println(uf.Connected(1, 9))
	fmt.Println(uf.Connected(3, 9))
	fmt.Println(uf.Connected(1, 4))
	fmt.Println(uf.Connected(8, 4))
	fmt.Println(uf.Connected(4, 5))
	fmt.Println(uf.Connected(5, 6))
	fmt.Println(uf.Connected(6, 7))
}