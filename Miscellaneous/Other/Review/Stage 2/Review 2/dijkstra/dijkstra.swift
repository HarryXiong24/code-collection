import Foundation

typealias EdgeMap = [String: Int]
typealias Graph = [String: EdgeMap]

func dijkstra(graph: Graph, start: String, end: String) -> ([String], Int) {
    var dijkstraTable: EdgeMap = graph.keys.reduce(into: [:]) { (result, key) in
        result[key] = Int.max
    }
    var pathRecord: [String: String?] = graph.keys.reduce(into: [:]) { (result, key) in
        result[key] = nil
    }
    
    // Init
    var visited = Set<String>()
    var queue: [(String, Int)] = [(start, 0)]
    dijkstraTable[start] = 0
    
    while !queue.isEmpty {
        queue.sort { $0.1 < $1.1 }
        let (currentNode, currentCost) = queue.removeFirst()
        
        if visited.contains(currentNode) {
            continue
        }
        visited.insert(currentNode)
        
        let neighbors = graph[currentNode]!
        for neighbor in neighbors.keys {
            let weight = neighbors[neighbor]!
            
            if currentCost + weight < dijkstraTable[neighbor]! {
                dijkstraTable[neighbor] = currentCost + weight
                pathRecord[neighbor] = currentNode
                queue.append((neighbor, currentCost + weight))
            }
        }
    }
    
    func getShortestPath(node: String?, result: inout [String]) {
        if node == nil {
            return
        } 
        result.append(node!)
        if let nextNode = pathRecord[node!] {
            getShortestPath(node: nextNode, result: &result)
        }
    }
    
    var shortestPath: [String] = []
    getShortestPath(node: end, result: &shortestPath)
    
    return (shortestPath.reversed(), dijkstraTable[end]!)
}

// Test
let graph: Graph = [
    "A": ["B": 1, "C": 1, "D": 3],
    "B": ["A": 1, "D": 2, "E": 1],
    "C": ["A": 1, "D": 1],
    "D": ["A": 2, "B": 3, "C": 1, "E": 2],
    "E": ["B": 1, "D": 2]
]
let (result, cost) = dijkstra(graph: graph, start: "A", end: "E")
print(result, cost)