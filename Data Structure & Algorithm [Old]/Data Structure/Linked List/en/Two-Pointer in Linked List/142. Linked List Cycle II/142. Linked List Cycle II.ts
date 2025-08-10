// 142. Linked List Cycle II

// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
// Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed).
// It is -1 if there is no cycle. Note that pos is not passed as a parameter.
// Do not modify the linked list.

// Example 1:
// Input: head = [3,2,0,-4], pos = 1
// Output: tail connects to node index 1
// Explanation: There is a cycle in the linked list, where tail connects to the second node.

// Example 2:
// Input: head = [1,2], pos = 0
// Output: tail connects to node index 0
// Explanation: There is a cycle in the linked list, where tail connects to the first node.

// Example 3:
// Input: head = [1], pos = -1
// Output: no cycle
// Explanation: There is no cycle in the linked list.

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// it is a rule
export function detectCycle(head: ListNode | null): ListNode | null {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
    if (slow === fast) {
      break;
    }
  }
  // 如果无环，退出循环经过此检验，返回 null
  if (fast === null || fast.next === null) {
    return null;
  }
  // 然后先把一个指针重新指向 head
  fast = head;
  while (fast !== slow) {
    fast = fast!.next;
    slow = slow!.next;
  }
  return fast;
}

// the regular solution
export function detectCycle1(head: ListNode | null): ListNode | null {
  let point = head;
  const res: ListNode[] = [];
  while (point !== null) {
    if (res.includes(point)) {
      return point;
    } else {
      res.push(point);
    }
    point = point.next;
  }
  return null;
}
