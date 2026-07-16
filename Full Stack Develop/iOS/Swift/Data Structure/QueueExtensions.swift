import Foundation

public protocol Queue { associatedtype Q }

/// FIFO (first-in first-out) Queue
extension LinkedList: Queue {

  public typealias Q = T

  /// Add this element at the end of the queue
  public func enqueue(_ element: Q) {
    self.append(element)
  }

  /// Returns and remove the first element of the queue
  public func dequeue() -> Q? {
    return self.removeFirst()
  }

  /// Returns the first element of the queue
  public func peekQueue() -> Q? {
    return self.head.next?.element
  }
}

/// FIFO (first-in first-out) Queue
extension Array: Queue {

  public typealias Q = Element

  // /Add this element at the end of the queue
  public mutating func enqueue(_ element: Q) {
    self.append(element)
  }

  /// Returns and remove the first element of the quemutating ue
  public mutating func dequeue() -> Q? {
    return self.removeFirst()
  }

  /// Returns the first element of the queue
  public func peekQueue() -> Q? {
    return self.first
  }
}

extension PriorityQueue: Queue {

  public typealias Q = T

  /// Returns the first element of the queue
  public func peekQueue() -> Q? {
    return self.first
  }
}

