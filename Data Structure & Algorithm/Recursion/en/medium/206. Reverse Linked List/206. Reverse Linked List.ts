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
  let pre: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    const next = current.next;
    current.next = pre;
    pre = current;
    current = next;
  }

  return pre;
}

// recursively
export function reverseList1(head: ListNode | null): ListNode | null {
  if (head === null) {
    return head;
  }
  if (head.next === null) {
    return head;
  }
  const newLink = reverseList1(head.next);
  const temp = head.next;
  temp.next = head;
  head.next = null;
  return newLink;
}
