import Foundation

final class BST<T: Comparable> {
    var value: T
    var left: BST<T>?
    var right: BST<T>?

    init(value: T) {
        self.value = value
    }

    convenience init?(array: [T]) {
        guard !array.isEmpty else {return nil}
        self.init(value: array[0])
        for v in array.dropFirst() {
            insert(v)
        }
    }

    func insert(_ value: T) {
        if value > self.value {
            if let r = right {
                r.insert(value)
            } else {
                right = BST(value: value)
            }
        } else {
            if let l = left {
                l.insert(value)
            } else {
                left = BST(value: value)
            }
        }
    }
}
