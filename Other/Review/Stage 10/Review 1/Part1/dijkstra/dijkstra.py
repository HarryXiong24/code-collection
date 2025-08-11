def dijkstra(
    graph: dict[str, dict[str, int]], start: str, end: str
) -> tuple[list[str], int]:
    dijkstra_map = {node: float("inf") for node in graph}
    shortest_path_record = {node: "" for node in graph}

    queue = [(start, 0)]
    visited = set()
    dijkstra_map[start] = 0

    while queue:
        # sort by cost
        queue.sort(key=lambda x: x[1])
        current_node, current_cost = queue.pop(0)

        if current_node in visited:
            continue
        visited.add(current_node)

        for neighbor, weight in graph[current_node].items():
            if current_cost + weight < dijkstra_map[neighbor]:
                dijkstra_map[neighbor] = current_cost + weight
                queue.append((neighbor, current_cost + weight))
                shortest_path_record[neighbor] = current_node

    shortest_path = []

    def get_shortest_path(node: str):
        if not node:
            return
        shortest_path.append(node)
        get_shortest_path(shortest_path_record[node])

    get_shortest_path(end)
    shortest_path.reverse()

    return shortest_path, dijkstra_map[end]


# test
graph = {
    "A": {"B": 1, "C": 1, "D": 3},
    "B": {"A": 1, "D": 2, "E": 1},
    "C": {"A": 1, "D": 1},
    "D": {"A": 2, "B": 3, "C": 1, "E": 2},
    "E": {"B": 1, "D": 2},
}

result, cost = dijkstra(graph, "A", "E")
print(result, cost)
