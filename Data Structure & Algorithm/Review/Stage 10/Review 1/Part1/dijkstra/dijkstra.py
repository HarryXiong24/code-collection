from math import inf

def dijkstra(graph: dict[str, dict[str, float]], start: str, end: str) -> tuple[list[str], float]:
    nodes = list(graph.keys())

    distance_map = {node: inf for node in nodes}
    predecessor_map = {node: None for node in nodes}

    distance_map[start] = 0
    queue: list[tuple[str, float]] = [(start, 0)]
    visited = set()

    while queue:
        queue.sort(key=lambda x: x[1])
        current_node, current_cost = queue.pop(0)

        if current_node in visited:
            continue
        visited.add(current_node)

        for neighbor, weight in graph.get(current_node, {}).items():
            if current_cost + weight < distance_map[neighbor]:
                distance_map[neighbor] = current_cost + weight
                queue.append((neighbor, current_cost + weight))
                predecessor_map[neighbor] = current_node


    if distance_map[end] == inf:
        return [], inf

    shortest_path = []
    def get_shortest_path(node: str):
        if not node:
            return
        shortest_path.append(node)
        get_shortest_path(predecessor_map[node])

    get_shortest_path(end)
    shortest_path.reverse()

    return shortest_path, distance_map[end]


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
