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

// test
let unionFind = UnionFind(size: 10)
unionFind.union(1, 2)
unionFind.union(2, 3)
unionFind.union(4, 5)
unionFind.union(6, 7)
unionFind.union(8, 9)
unionFind.union(1, 9)
print(unionFind.connected(1, 9)) // true
print(unionFind.connected(3, 9)) // true
print(unionFind.connected(1, 4)) // false
print(unionFind.connected(8, 4)) // false
print(unionFind.connected(4, 5)) // true
print(unionFind.connected(5, 6)) // false
print(unionFind.connected(6, 7)) // true