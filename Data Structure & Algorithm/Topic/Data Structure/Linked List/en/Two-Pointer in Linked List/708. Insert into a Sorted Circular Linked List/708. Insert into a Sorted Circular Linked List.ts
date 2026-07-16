// 708. Insert into a Sorted Circular Linked List

// Given a Circular Linked List node, which is sorted in non-descending order, write a function to insert a value insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list and may not necessarily be the smallest value in the circular list.

// If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.

// If the list is empty (i.e., the given node is null), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the originally given node.

// Example 1:
// Input: head = [3,4,1], insertVal = 2
// Output: [3,4,1,2]
// Explanation: In the figure above, there is a sorted circular list of three elements. You are given a reference to the node with value 3, and we need to insert 2 into the list. The new node should be inserted between node 1 and node 3. After the insertion, the list should look like this, and we should still return node 3.

// Example 2:
// Input: head = [], insertVal = 1
// Output: [1]
// Explanation: The list is empty (given head is null). We create a new single circular list and return the reference to that single node.

// Example 3:
// Input: head = [1], insertVal = 0
// Output: [1,0]

// Definition for node.
class Node {
  val: number;
  next: Node | null;
  constructor(val?: number, next?: Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function insert(head: Node | null, insertVal: number): Node | null {
  if (!head) {
    const newNode = new Node(insertVal, undefined);
    newNode.next = newNode;
    return newNode;
  }

  let prev = head;
  let current = head.next as Node;
  let toInsert = false;

  while (true) {
    if (prev.val < current.val && prev.val <= insertVal && insertVal <= current.val) {
      // case 1
      toInsert = true;
    } else if (prev.val > current.val) {
      // case 2
      if (prev.val <= insertVal || insertVal <= current.val) {
        toInsert = true;
      }
    }

    if (toInsert) {
      prev.next = new Node(insertVal, current);
      return head;
    }

    prev = current;
    current = current.next as Node;

    if (prev == head) {
      break;
    }
  }

  // case 3: did not insert the node in the loop
  prev.next = new Node(insertVal, current);
  return head;
}
