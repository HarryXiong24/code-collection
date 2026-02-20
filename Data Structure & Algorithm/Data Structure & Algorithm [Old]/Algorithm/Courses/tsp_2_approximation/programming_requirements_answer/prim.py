import heapq

def prim(
    vertex_count: int, edge_count: int, edges: list[list[int, int, int]]
) -> int:
    cost: int = 0
    mst_path: list[tuple[int, int]] = []

    # initialize
    count = vertex_count - 1
    visited = [False] * vertex_count
    heap: list[tuple[int, int, int]] = []  # (weight, u, v)

    # Adds the edge connected to node 0 into the heap
    for item in edges:
        if item[0] == 0 or item[1] == 0:
            heapq.heappush(heap, (item[2], item[0], item[1]))
    visited[0] = True

    while count > 0 and heap:
        # Removes the least weighted edge from the heap
        weight, u, v = heapq.heappop(heap)

        if not visited[u] or not visited[v]:
            mst_path.append((u, v))
            cost += weight
            count -= 1

            # Identify the next unaccessed node
            next_node = u if not visited[u] else v
            visited[next_node] = True

            # Add all new edges associated with next_node to the heap
            for item in edges:
                if (item[0] == next_node and not visited[item[1]]) or (
                    item[1] == next_node and not visited[item[0]]
                ):
                    heapq.heappush(heap, (item[2], item[0], item[1]))

    return int(cost)

