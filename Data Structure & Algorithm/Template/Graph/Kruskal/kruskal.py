from typing import List


class QuickUnion:
    def __init__(self, size) -> None:
        self.root = [i for i in range(size)]

    def find(self, x):
        if self.root[x] == x:
            return x
        return self.find(self.root[x])

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.root[root_y] = root_x

    def isConnected(self, x, y):
        return self.find(x) == self.find(y)


# Prim's algorithm depends on the vertices of the graph, whereas Kruskal's algorithm depends on the edges.
# For a graph with relatively fewer edges (sparse graph), Kruskal's algorithm might be a better choice
# For a graph with many edges (dense graph), Prim's algorithm might be more efficient.


# O(E log E), E is # of edges
def kruskal(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    uf = QuickUnion(points)
    mst = []
    cost = 0
    count = points - 1

    edges.sort(key=lambda x: x[2])

    while len(edges) > 0 and count > 0:
        v, w, weight = edges.pop(0)
        if not uf.isConnected(v, w):
            mst.append([v, w])
            uf.union(v, w)
            cost += weight
            count -= 1

    return (cost, mst)


# test
res = kruskal(
    [
        [0, 1, 4],
        [0, 2, 13],
        [0, 3, 7],
        [0, 4, 7],
        [1, 2, 9],
        [1, 3, 3],
        [1, 4, 7],
        [2, 3, 10],
        [2, 4, 14],
        [3, 4, 4],
    ],
    5,
)
print(res)
