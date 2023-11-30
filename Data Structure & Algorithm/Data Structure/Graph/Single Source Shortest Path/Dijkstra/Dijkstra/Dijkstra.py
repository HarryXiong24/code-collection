import heapq


def dijkstra(graph, start):
    # Initialize distances and priority queue
    distances = {node: float("infinity") for node in graph}
    distances[start] = 0
    queue = [(0, start)]

    while queue:
        current_distance, current_node = heapq.heappop(queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            if current_distance + weight < distances[neighbor]:
                distances[neighbor] = current_distance + weight
                heapq.heappush(queue, (current_distance + weight, neighbor))

    return distances


# Example usage
graph = {
    "A": {"B": 1, "C": 4},
    "B": {"A": 1, "C": 2, "D": 5},
    "C": {"A": 4, "B": 2, "D": 1},
    "D": {"B": 5, "C": 1},
}

distances = dijkstra(graph, "A")
print(distances)
