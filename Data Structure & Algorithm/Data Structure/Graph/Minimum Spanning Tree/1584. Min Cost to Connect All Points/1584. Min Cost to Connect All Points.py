# 1584. Min Cost to Connect All Points

# You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

# The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

# Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

# Example 1:
# Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
# Output: 20
# Explanation: 
# We can connect the points as shown above to get the minimum cost of 20.
# Notice that there is a unique path between every pair of points.

# Example 2:
# Input: points = [[3,12],[-2,5],[-4,1]]
# Output: 18

import heapq
from typing import List

class UnionFind:
    def __init__(self, size):
        self.root = [i for i in range(size)]
        self.rank = [1] * size

    def find(self, x):
        if x == self.root[x]:
            return x
        self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX != rootY:
            if self.rank[rootX] > self.rank[rootY]:
                self.root[rootY] = rootX
            elif self.rank[rootX] < self.rank[rootY]:
                self.root[rootX] = rootY
            else:
                self.root[rootY] = rootX
                self.rank[rootX] += 1

    def connected(self, x, y):
        return self.find(x) == self.find(y)
      
class Edge:
    def __init__(self, point1, point2, cost):
        self.point1 = point1
        self.point2 = point2
        self.cost = cost

    # rewrite sorting method
    def __lt__(self, other):
        return self.cost < other.cost


class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        if not points or len(points) == 0:
            return 0
        size = len(points)
        pq = []
        uf = UnionFind(size)

        for i in range(size):
            x1, y1 = points[i]
            for j in range(i + 1, size):
                x2, y2 = points[j]
                cost = abs(x1 - x2) + abs(y1 - y2)
                edge = Edge(i, j, cost)
                pq.append(edge)
                        
        heapq.heapify(pq)

        result = 0
        count = size - 1
        while pq and count > 0:
            edge = heapq.heappop(pq)
            if not uf.connected(edge.point1, edge.point2):
                uf.union(edge.point1, edge.point2)
                result += edge.cost
                count -= 1
        return result

# test
points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
solution = Solution()
res = solution.minCostConnectPoints(points)
print(res)
