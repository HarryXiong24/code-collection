class DisjointSet:
    def __init__(self, size):
        self.root = [i for i in range(size)]

    # The find function here is the same as that in the disjoint set with path compression.
    def find(self, x):
        if self.root[x] == x:
            return x
        return self.find(self.root[x])

    # The union function with union by rank
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.root[root_y] = root_x

    def connected(self, x, y):
        return self.find(x) == self.find(y)


# test
uf = DisjointSet(10)
uf.union(1, 2)
uf.union(2, 3)
uf.union(4, 5)
uf.union(6, 7)
uf.union(8, 9)
uf.union(1, 9)
print(uf.connected(1, 9))
print(uf.connected(3, 9))
print(uf.connected(1, 4))
print(uf.connected(1, 8))
