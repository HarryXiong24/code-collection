class MonotonicQueue {
    private var queue: [Int]
    
    init() {
        self.queue = []
    }
    
    func push(_ value: Int) {
        while !queue.isEmpty && queue.last! < value {
            queue.removeLast()
        }
        queue.append(value)
    }
    
    func pop() {
        if !queue.isEmpty {
            queue.removeFirst()
        }
    }
    
    func getMax() -> Int? {
        return queue.first
    }
    
    func size() -> Int {
        return queue.count
    }
    
    func isEmpty() -> Bool {
        return queue.isEmpty
    }
}

// 測試
let mq = MonotonicQueue()
mq.push(3)
mq.push(1)
mq.push(4)
mq.push(2)
mq.push(1)

print(mq.queue)