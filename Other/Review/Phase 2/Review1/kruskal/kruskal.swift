class UnionFind {
    var root: [Int]

    init(size: Int) {
        self.root = Array(0..<size)
    }

    func find(_ x: Int) -> Int {
        if root[x] == x {
            return x
        }
        root[x] = find(root[x]) // Path compression
        return root[x]
    }

    func union(_ x: Int, _ y: Int) {
        let rootX = find(x)
        let rootY = find(y)
        if rootX != rootY {
            root[rootY] = rootX
        }
    }

    func connected(_ x: Int, _ y: Int) -> Bool {
        return find(x) == find(y)
    }
}

func kruskal(_ graph: [[Int]], _ vertices: Int) -> (Int, [[Int]]) {
    var cost = 0
    var mst: [[Int]] = []
    let uf = UnionFind(size: vertices)
    var edges = graph

    edges.sort { $0[2] < $1[2] }

    for edge in edges {
        let v = edge[0]
        let w = edge[1]
        let weight = edge[2]

        if !uf.connected(v, w) {
            cost += weight
            mst.append([v, w])
            uf.union(v, w)
        }
    }

    return (cost, mst)
}

// Test
let res = kruskal(
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