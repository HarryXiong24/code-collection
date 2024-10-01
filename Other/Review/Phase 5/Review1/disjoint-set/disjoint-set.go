package main

import "fmt"

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

func main() {
	unionFind := New(10)
	unionFind.Union(1, 2)
	unionFind.Union(2, 3)
	unionFind.Union(4, 5)
	unionFind.Union(6, 7)
	unionFind.Union(8, 9)
	unionFind.Union(1, 9)
	fmt.Println(unionFind.IsConnected(1, 9))
	fmt.Println(unionFind.IsConnected(3, 9))
	fmt.Println(unionFind.IsConnected(1, 4))
	fmt.Println(unionFind.IsConnected(8, 4))
	fmt.Println(unionFind.IsConnected(4, 5))
	fmt.Println(unionFind.IsConnected(5, 6))
	fmt.Println(unionFind.IsConnected(6, 7))
}
