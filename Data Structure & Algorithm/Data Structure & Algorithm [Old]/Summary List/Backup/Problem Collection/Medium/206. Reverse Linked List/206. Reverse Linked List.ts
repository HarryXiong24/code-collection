// 206. Reverse Linked List

// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]

// Example 2:
// Input: head = [1,2]
// Output: [2,1]

// Example 3:
// Input: head = []
// Output: []

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Recursion
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reverseList(head: ListNode | null): ListNode | null {
  const recursive = (node: ListNode | null): ListNode | null => {
    if (!node || !node.next) {
      return node;
    }
    const newHead = recursive(node.next);
    const temp = node.next;
    temp.next = node;
    node.next = null;
    return newHead;
  };
  return recursive(head);
}

// Iteration
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reverseList1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let pre: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    const next: ListNode | null = current.next;
    current.next = pre;
    pre = current;
    current = next;
  }

  return pre;
}
