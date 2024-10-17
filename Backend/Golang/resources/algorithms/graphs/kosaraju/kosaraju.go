package kosaraju

import (
	"fmt"

	"structure.com/algorithms/graphs/dfs"
	"structure.com/data-structures/graph"
	"structure.com/data-structures/stack"
)

func Scc(g *graph.DirGraph) []stack.Stack {
	s := stack.New()
	n := g.Order()
	SCCs := make([]stack.Stack, 0)
	visited := make(map[graph.VertexId]bool)
	vertices := g.VerticesIter()

	for s.Len() != n {
		vertex := <-vertices
		dfs.DirectedDfs(g, vertex, func(v graph.VertexId) {
			if visited[v] == false {
				fmt.Println(vertex, v)
				s.Push(v)
				visited[v] = true
			}
		})
	}

	fmt.Println(s)

	r := g.Reverse()
	visited = make(map[graph.VertexId]bool)
	for s.Len() > 0 {
		vertex := s.Pop().(graph.VertexId)
		scc := stack.New()

		if visited[vertex] == false {
			dfs.DirectedDfs(r, vertex, func(v graph.VertexId) {
				fmt.Println(vertex, v)
				if visited[graph.VertexId(v)] == false {
					visited[graph.VertexId(v)] = true
					fmt.Println(vertex, v)
					scc.Push(v)
				}
			})
		}
		if scc.Len() > 1 {
			SCCs = append(SCCs, *scc)
		}
	}
	return SCCs
}
