from typing import List


def prim(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    cost = 0
    min_spanning_tree: List[List[int]] = []

    count = points - 1
    queue: List[List[int]] = []
    visited = [False] * points

    for edge in edges:
        if edge[0] == 0 or edge[1] == 0:
            queue.append(edge)

    visited[0] = True

    while count > 0 and len(queue) > 0:
        queue.sort(key=lambda x: x[2])
        v, w, weight = queue.pop(0)

        if not visited[v] or not visited[w]:
            min_spanning_tree.append([v, w])
            cost += weight
            count -= 1
            new_node = v if not visited[v] else w
            visited[new_node] = True

            for edge in edges:
                if (edge[0] == new_node and not visited[edge[1]]) or (
                    edge[1] == new_node and not visited[edge[0]]
                ):
                    queue.append(edge)

    return cost, min_spanning_tree


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
