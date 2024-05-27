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


def kruskal(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    min_spanning_tree: List[int] = []
    cost: int = 0

    # init
    uf = QuickUnion(points)
    count = points - 1

    edges.sort(key=lambda x: x[2])

    while count > 0:
        v, w, weight = edges.pop(0)

        if not uf.isConnected(v, w):
            cost += weight
            min_spanning_tree.append([v, w])
            uf.union(v, w)
            count -= 1

    return cost, min_spanning_tree


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
