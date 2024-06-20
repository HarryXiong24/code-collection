import Foundation

public protocol Stack { associatedtype E }

/// LIFO (last-in first-out) Stack
extension LinkedList: Stack {

  public typealias E = T

  /// Removes the object at the top of this stack and returns that object as the value 
  /// of this function.
  public func pop() -> E? {
    return self.removeLast()
  }

  /// Pushes an item onto the top of this stack.
  public func push(_ element: E) {
    self.append(element)
  }

  /// Looks at the object at the top of this stack without removing it from the stack.
  public func peekStack() -> E? {
    guard let node = self.tail else { return nil }
    return node.element
  }
}

///LIFO (last-in first-out) Stack
extension Array: Stack {

  public typealias E = Element

  /// Removes the object at the top of this stack and returns that object as the value
  // of this function.
  public mutating func pop() -> E? {
    return self.removeLast()
  }

  /// Pushes an item onto the top of this stack.
  public mutating func push(_ element: E) {
    self.append(element)
  }

  /// Looks at the object at the top of this stack without removing it from the stack.
  public func peekStack() -> E? {
    return self.last
  }
}
