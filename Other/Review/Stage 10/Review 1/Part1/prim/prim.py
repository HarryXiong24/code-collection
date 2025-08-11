def prim(graph, vertices):
    mst = []
    cost = 0

    queue = []
    visited = set()
    count = vertices - 1

    # init
    for edge in graph:
        if edge[0] == 0 or edge[1] == 0:
            queue.append(edge)
    visited.add(0)

    while count > 0 and queue:
        # sort by weight
        queue.sort(key=lambda x: x[2])

        # pop front
        u, v, weight = queue.pop(0)

        if u not in visited or v not in visited:
            mst.append([u, v])
            cost += weight
            count -= 1

            next_node = u if u not in visited else v
            visited.add(next_node)

            for edge in graph:
                if (edge[0] == next_node and edge[1] not in visited) or (
                    edge[1] == next_node and edge[0] not in visited
                ):
                    queue.append(edge)

    return cost, mst


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

cost, mst = prim(graph, 5)
print("Cost:", cost)
print("MST:", mst)
