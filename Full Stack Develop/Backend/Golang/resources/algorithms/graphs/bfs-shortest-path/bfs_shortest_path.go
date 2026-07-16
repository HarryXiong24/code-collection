package bfs

import (
	"structure.com/algorithms/graphs/bfs"
	"structure.com/data-structures/graph"
)

func ShortestPath(g *graph.DirGraph, start graph.VertexId) (dist map[graph.VertexId]int) {
	dist = make(map[graph.VertexId]int)
	visited := make(map[graph.VertexId]bool)

	getDist := func(v graph.VertexId) {
		neighbours := g.GetNeighbours(v).VerticesIter()
		visited[v] = true

		for neighbour := range neighbours {

			ok := visited[neighbour]
			if !ok {
				dist[neighbour] = dist[v] + 1
			}
		}
	}

	bfs.Bfs(g, start, getDist)

	return
}

func GetDist(g *graph.DirGraph, from graph.VertexId, to graph.VertexId) int {
	return ShortestPath(g, from)[to]
}
