// 61. Rotate List

// Given the head of a linked list, rotate the list to the right by k places.

// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]

// Example 2:
// Input: head = [0,1,2], k = 4
// Output: [2,0,1]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (head === null) {
    return null;
  }

  let current: ListNode | null = head;
  let len: number = 0;
  let newHead: ListNode | null = null;

  // get the length of linked list
  while (current !== null) {
    len++;
    current = current.next;
  }

  // reset
  current = head;

  if (k % len === 0) {
    return head;
  }
  k = len - (k % len);

  while (k > 1) {
    current = current!.next;
    k--;
  }

  newHead = current!.next;
  current!.next = null;

  current = newHead!;
  while (current && current.next !== null) {
    current = current!.next;
  }
  current.next = head;

  return newHead;
}
