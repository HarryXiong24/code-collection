import Foundation

protocol TestNode {
    var value: Any { get }
    var neighbors: [TestNode] { get }
}

func BFS(root: TestNode?) -> Int {
    guard let root = root else {
        return 0
    }

    var queue: [TestNode] = [root]
    var depth = 0

    while !queue.isEmpty {
        let size = queue.count

        for _ in 0..<size {
            let current = queue.removeFirst()
            print(current.value)

            for neighbor in current.neighbors {
                queue.append(neighbor)
            }
        }

        depth += 1
    }

    return depth
}

func DFS_Iteration(root: TestNode?) {
    guard let root = root else {
        return
    }

    var stack: [TestNode] = [root]

    while !stack.isEmpty {
        let current = stack.removeLast()
        print(current.value)

        for neighbor in current.neighbors {
            stack.append(neighbor)
        }
    }
}

func DFS_Recursion(root: TestNode?) {
    guard let root = root else {
        return
    }

    func recursive(node: TestNode) {
        print(node.value)

        for neighbor in node.neighbors {
            recursive(node: neighbor)
        }
    }

    recursive(node: root)
}


struct Node: TestNode {
    var value: Any
    var neighbors: [TestNode]
}

// test
let root: TestNode = Node(value: 1, neighbors: [
    Node(value: 2, neighbors: [
        Node(value: 4, neighbors: []),
        Node(value: 5, neighbors: [])
    ]),
    Node(value: 3, neighbors: [
        Node(value: 6, neighbors: [
            Node(value: 7, neighbors: [])
        ])
    ])
])

// BFS
let res = BFS(root: root)
print("layer", res)

// DFS Recursion
print("------")
DFS_Recursion(root: root)

// DFS Iteration
print("------")
DFS_Iteration(root: root)