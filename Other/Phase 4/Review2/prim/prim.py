from typing import List


def prim(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    mst: List[List[int]] = []
    cost = 0

    count = points - 1
    queue: List[List[int]] = []
    visited: List[bool] = [False] * points

    for item in edges:
        if item[0] == 0 or item[1] == 0:
            queue.append(item)
    visited[0] = True

    while count > 0:
        queue.sort(key=lambda x: x[2])

        v, w, weight = queue.pop(0)

        if not visited[v] or not visited[w]:
            cost += weight
            mst.append([v, w])
            count -= 1

            next_node = v if not visited[v] else w
            visited[next_node] = True

            for item in edges:
                if (item[0] == next_node and not visited[item[1]]) or (
                    item[1] == next_node and not visited[item[0]]
                ):
                    queue.append(item)

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
