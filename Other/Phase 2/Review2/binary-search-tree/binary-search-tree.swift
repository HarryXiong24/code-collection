// Binary Search Tree

class TreeNode {
  var val: Int
  var left: TreeNode?
  var right: TreeNode?
  
  init(_ val: Int, _ left: TreeNode? = nil, _ right: TreeNode? = nil) {
    self.val = val
    self.left = left
    self.right = right
  }
}

class BinarySearchTree {
  var root: TreeNode?
  
  init(_ root: TreeNode? = nil) {
    self.root = root
  }
  
  func searchNode(_ value: Int) -> Bool {
    func recursive(_ node: TreeNode?) -> Bool {
      guard let node = node else {
        return false
      }
      
      if value < node.val {
        return recursive(node.left)
      } else if value > node.val {
        return recursive(node.right)
      } else {
        return true
      }
    }
    
    return recursive(root)
  }
  
  func insertNode(_ newValue: Int) -> Bool {
    if root == nil {
      root = TreeNode(newValue)
      return true
    }
    
    func recursion(_ node: TreeNode) -> Bool {
      if newValue < node.val {
        if node.left == nil {
          node.left = TreeNode(newValue)
          return true
        }
        return recursion(node.left!)
      } else if newValue > node.val {
        if node.right == nil {
          node.right = TreeNode(newValue)
          return true
        }
        return recursion(node.right!)
      } else {
        return false
      }
    }
    
    return recursion(root!)
  }
  
  func deleteNode(_ value: Int) -> Bool {
    func recursion(_ node: TreeNode?, _ parent: TreeNode?) -> Bool {
      guard let node = node else {
        return false
      }
      
      if value < node.val {
        return recursion(node.left, node)
      } else if value > node.val {
        return recursion(node.right, node)
      } else {
        if node.left == nil || node.right == nil {
          let child = node.left ?? node.right
          
          if parent == nil {
            root = child
          } else if parent!.left === node {
            parent!.left = child
          } else {
            parent!.right = child
          }
        } else {
          var currentMinNode = node.right
          var parentNode = node
          
          while currentMinNode!.left != nil {
            parentNode = currentMinNode!
            currentMinNode = currentMinNode!.left
          }
          
          node.val = currentMinNode!.val
          if parentNode.left === currentMinNode {
            parentNode.left = currentMinNode!.right
          } else {
            parentNode.right = currentMinNode!.right
          }
        }
        return true
      }
    }
    
    return recursion(root, nil)
  }
  
  func preorder() -> [Int] {
    var res = [Int]()
    
    func recursive(_ node: TreeNode?) {
      guard let node = node else {
        return
      }
      
      res.append(node.val)
      recursive(node.left)
      recursive(node.right)
    }
    
    recursive(root)
    return res
  }
  
  func inorder() -> [Int] {
    var res = [Int]()
    
    func recursive(_ node: TreeNode?) {
      guard let node = node else {
        return
      }
      
      recursive(node.left)
      res.append(node.val)
      recursive(node.right)
    }
    
    recursive(root)
    return res
  }
  
  func postorder() -> [Int] {
    var res = [Int]()
    
    func recursive(_ node: TreeNode?) {
      guard let node = node else {
        return
      }
      
      recursive(node.left)
      recursive(node.right)
      res.append(node.val)
    }
    
    recursive(root)
    return res
  }
}

// test
let tree = BinarySearchTree()
tree.insertNode(8)
tree.insertNode(14)
tree.insertNode(10)
tree.insertNode(13)
tree.insertNode(3)
tree.insertNode(1)
tree.insertNode(6)
tree.insertNode(4)
tree.insertNode(7)
let insertRes1 = tree.preorder()
print(insertRes1)
let searchRes1 = tree.searchNode(14)
print(searchRes1)
let searchRes2 = tree.searchNode(5)
print(searchRes2)

tree.deleteNode(8)
let deleteRes1 = tree.preorder()
print(deleteRes1)

tree.deleteNode(3)
let deleteRes2 = tree.preorder()
print(deleteRes2)