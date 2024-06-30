enum Color: Int {
    case White = 0 // non-access
    case Gray = 1
    case Black = 2 // both itself and its adjacent nodes were accessed
}

class Graph {
    var vertices: Int
    var adjacentList: [Int: [Int]]
    
    init(size: Int) {
        self.vertices = size
        self.adjacentList = [:]
    }
    
    func addEdge(v: Int, w: Int) {
        if adjacentList[v] == nil {
            adjacentList[v] = []
        }
        adjacentList[v]?.append(w)
    }
    
    func topologicalSort() -> [Int]? {
        var stack: [Int] = []
        var visited = Array(repeating: Color.White, count: vertices)
        
        func recursion(_ vertex: Int) -> Bool {
            visited[vertex] = .Gray
            
            if let neighbors = adjacentList[vertex] {
                for neighbor in neighbors {
                    if visited[neighbor] == .Gray {
                        return true
                    }
                    if visited[neighbor] == .White && recursion(neighbor) {
                        return true
                    }
                }
            }
            
            stack.append(vertex)
            visited[vertex] = .Black
            return false
        }
        
        for i in 0..<vertices {
            if visited[i] == .White {
                if recursion(i) {
                    return nil
                }
            }
        }
        
        return stack.reversed()
    }
}

// test
let graph1 = Graph(size: 6)
graph1.addEdge(v: 5, w: 2)
graph1.addEdge(v: 5, w: 0)
graph1.addEdge(v: 4, w: 0)
graph1.addEdge(v: 4, w: 1)
graph1.addEdge(v: 2, w: 3)
graph1.addEdge(v: 3, w: 1)

if let result1 = graph1.topologicalSort() {
    print(result1) // [5, 4, 2, 3, 1, 0]
} else {
    print("Cycle detected")
}

let graph2 = Graph(size: 6)
graph2.addEdge(v: 5, w: 2)
graph2.addEdge(v: 5, w: 0)
graph2.addEdge(v: 4, w: 0)
graph2.addEdge(v: 4, w: 1)
graph2.addEdge(v: 2, w: 3)
graph2.addEdge(v: 3, w: 1)
graph2.addEdge(v: 1, w: 2)

if let result2 = graph2.topologicalSort() {
    print(result2) // [5, 4, 2, 3, 1, 0]
} else {
    print("Cycle detected")
}