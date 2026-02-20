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

// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// iteratively
export function reverseList(head: ListNode | null): ListNode | null {
  let slow = null;
  let fast = head;

  if (!head) {
    return null;
  }

  while (fast) {
    const temp = fast.next;
    fast.next = slow;
    slow = fast;
    fast = temp;
  }

  return slow;
}

// recursively
export function reverseList1(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  const recursion = (node: ListNode | null): ListNode | null => {
    if (!node || !node.next) {
      return node;
    }

    const newHead = recursion(node.next)!;
    const temp = node.next;
    temp.next = node;
    node.next = null;
    return newHead;
  };

  return recursion(head);
}
