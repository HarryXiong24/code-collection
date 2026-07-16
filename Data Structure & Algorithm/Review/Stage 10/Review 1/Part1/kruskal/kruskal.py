class DisjointSet:
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


def kruskal(edges: list[list[int]], points: int) -> tuple[int, list[list[int]]]:
    mst: list[list[int]] = []
    cost = 0

    # init
    count = points - 1
    uf = DisjointSet(points)
    edges.sort(key=lambda x: x[2])

    while count > 0:
        v, w, weight = edges.pop(0)

        if not uf.isConnected(v, w):
            mst.append([v, w])
            cost += weight
            count -= 1
            uf.union(v, w)

    return cost, mst


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
