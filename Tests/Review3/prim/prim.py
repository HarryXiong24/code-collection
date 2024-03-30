from typing import List


def prim(edges: List[List[int]], points: int) -> tuple[int, List[List[int]]]:
    path: List[List[int]] = []
    cost = 0

    count = points - 1
    visited: List[bool] = [False] * points
    queue: List[List[int]] = []

    # init
    visited[0] = True
    for item in edges:
        if item[0] == 0 or item[1] == 0:
            queue.append(item)

    while count > 0:
        queue.sort(key=lambda x: x[2])
        v, w, weight = queue.pop(0)

        if not visited[v] or not visited[w]:
            cost += weight
            path.append([v, w])
            count -= 1

            next_point = v if not visited[v] else w
            visited[next_point] = True

            for item in edges:
                if (item[0] == next_point and not visited[item[1]]) or (
                    item[1] == next_point and not visited[item[0]]
                ):
                    queue.append(item)

    return cost, path


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
