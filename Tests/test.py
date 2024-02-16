from typing import List


class DisjointSet:
    def __init__(self, size):
        self.root = [i for i in range(0, size)]

    def find(self, x):
        if self.root[x] == x:
            return x
        return self.find(self.root[x])

    def union(self, x, y):
        root_x = self.root[x]
        root_y = self.root[y]
        if root_x != root_y:
            self.root[root_y] = root_x

    def isConnected(self, x, y):
        return self.find(x) == self.find(y)


def kruskal(edges: List[List[int]], nodes: int) -> tuple[List[List[int]], int]:
    copy_data = edges.copy()
    mst = []
    cost = 0
    count = nodes - 1
    uf = DisjointSet(nodes)

    while count > 0:
        copy_data.sort(key=lambda x: x[2])
        v, w, weight = copy_data.pop(0)

        if not uf.isConnected(v, w):
            cost += weight
            mst.append([v, w])
            uf.union(v, w)
            count -= 1
    return mst, cost


def prim(edges: List[List[int]], nodes: int) -> tuple[List[List[int]], int]:
    copy_data = edges.copy()
    mst = []
    cost = 0
    count = nodes - 1
    visited = [False for _ in range(0, nodes)]
    current_contain = []

    # init
    visited[0] = True
    for edge in copy_data:
        if edge[0] == 0 or edge[1] == 0:
            current_contain.append(edge)

    while len(current_contain) > 0 and count > 0:
        current_contain.sort(key=lambda x: x[2])
        v, w, weight = current_contain.pop(0)

        if not visited[v] or not visited[w]:
            cost += weight
            mst.append([v, w])
            new_point = w if visited[v] == True else v
            visited[new_point] = True

            for edge in copy_data:
                if (edge[0] == new_point and not visited[edge[1]]) or (
                    (edge[1] == new_point and not visited[edge[0]])
                ):
                    current_contain.append(edge)

            count -= 1

    return mst, cost


# test
graph = [
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
]
res1 = kruskal(
    graph,
    5,
)
res2 = prim(
    graph,
    5,
)
print(res1)
print(res2)
