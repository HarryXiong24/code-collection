// 24. Swap Nodes in Pairs

// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]
// Explanation:

// Example 2:
// Input: head = []
// Output: []

// Example 3:
// Input: head = [1]
// Output: [1]

// Example 4:
// Input: head = [1,2,3]
// Output: [2,1,3]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function swapPairs(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  if (!head.next) {
    return head;
  }

  const dummyHead = new ListNode(0, head);
  let slow = dummyHead;
  let fast = dummyHead.next;

  while (fast && fast.next) {
    const second = fast.next;
    const nextGroup = second?.next;

    second.next = fast;
    fast.next = nextGroup;
    slow.next = second;

    slow = fast;
    fast = fast.next;
  }

  return dummyHead.next;
}
