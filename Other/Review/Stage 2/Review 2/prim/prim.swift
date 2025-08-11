import Foundation

func prim(_ graph: [[Int]], _ vertices: Int) -> (Int, [[Int]]) {
    var cost = 0
    var mst: [[Int]] = []
    var visited: [Bool] = Array(repeating: false, count: vertices)
    var count = vertices - 1
    var queue: [[Int]] = []

    // Init
    visited[0] = true
    for item in graph {
        if item[0] == 0 || item[1] == 0 {
            queue.append(item)
        }
    }

    while count > 0 && !queue.isEmpty {
        queue.sort { $0[2] < $1[2] }
        let edge = queue.removeFirst()
        let v = edge[0]
        let w = edge[1]
        let weight = edge[2]

        if !visited[v] || !visited[w] {
            cost += weight
            mst.append([v, w])
            count -= 1
            let newNode = !visited[v] ? v : w
            visited[newNode] = true

            for item in graph {
                if (item[0] == newNode && !visited[item[1]]) || (item[1] == newNode && !visited[item[0]]) {
                    queue.append(item)
                }
            }
        }
    }

    return (cost, mst)
}

// Test
let res = prim(
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
        [3, 4, 4]
    ],
    5
)
print(res)