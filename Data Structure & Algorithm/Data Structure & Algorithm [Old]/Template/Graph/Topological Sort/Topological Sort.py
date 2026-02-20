# Topological Sort

from enum import Enum
from typing import List


class Color(Enum):
    White = 0
    Gray = 1
    Black = 2


# By default, vertex index starts with 0, and the maximum index is vertices-1
class Graph:
    def __init__(self, vertices: int) -> None:
        self.vertices = vertices
        self.adjList: dict[float, List[float]] = {}

    def addEdge(self, v: float, w: float) -> None:
        if v not in self.adjList:
            self.adjList[v] = [w]
        self.adjList[v].append(w)

    def topologicalSort(self) -> List[float] | None:
        stack: List[float] = []
        visited: List[Color] = [Color.White] * self.vertices

        # true represent cycle detected
        def recursive(vertex: float) -> bool:
            visited[vertex] = Color.Gray

            if vertex in self.adjList:
                for neighbor in self.adjList[vertex]:
                    if visited[neighbor] == Color.Gray:
                        return True  # cycle detected
                    if visited[neighbor] == Color.White and recursive(neighbor):
                        return True  # cycle detected in recursion

            visited[vertex] = Color.Black
            stack.append(vertex)
            return False

        for i in range(0, self.vertices):
            if visited[i] == Color.White:
                if recursive(i):
                    return None

        stack.reverse()
        return stack


# test
graph1 = Graph(6)
graph1.addEdge(5, 2)
graph1.addEdge(5, 0)
graph1.addEdge(4, 0)
graph1.addEdge(4, 1)
graph1.addEdge(2, 3)
graph1.addEdge(3, 1)

result1 = graph1.topologicalSort()
print(result1)  # [5, 4, 2, 3, 1, 0]

graph2 = Graph(6)
graph2.addEdge(5, 2)
graph2.addEdge(5, 0)
graph2.addEdge(4, 0)
graph2.addEdge(4, 1)
graph2.addEdge(2, 3)
graph2.addEdge(3, 1)
graph2.addEdge(1, 2)

result = graph2.topologicalSort()
print(result)  # null
