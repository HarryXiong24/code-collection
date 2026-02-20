# Prim's algorithm depends on the vertices of the graph, whereas Kruskal's algorithm depends on the edges.
# For a graph with relatively fewer edges (sparse graph), Kruskal's algorithm might be a better choice
# For a graph with many edges (dense graph), Prim's algorithm might be more efficient.

from typing import List


# O(E + V log V), E is # of edges, V is # of vertices
def prim(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    mst = []
    cost = 0
    count = points - 1
    current_contain = []
    visited = [False] * points

    # begin at 0
    for edge in edges:
        if edge[0] == 0 or edge[1] == 0:
            current_contain.append(edge)

    current_contain.sort(key=lambda x: x[2])
    visited[0] = True

    while len(current_contain) > 0 and count > 0:
        v, w, weight = current_contain.pop(0)

        if not visited[v] or not visited[w]:
            cost += weight
            mst.append([v, w])
            new_point = w if visited[v] == True else v
            visited[new_point] = True

            for edge in edges:
                if (edge[0] == new_point and not visited[edge[1]]) or (
                    edge[1] == new_point and not visited[edge[0]]
                ):
                    current_contain.append(edge)

            current_contain.sort(key=lambda x: x[2])
            count -= 1

    return cost, mst


# test
res = prim(
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
