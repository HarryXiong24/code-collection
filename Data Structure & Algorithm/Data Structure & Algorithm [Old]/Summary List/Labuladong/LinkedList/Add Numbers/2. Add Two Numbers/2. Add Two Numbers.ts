// 2. Add Two Numbers

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]

// Example 3:
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1, null);

  let p1 = l1;
  let p2 = l2;
  let head = dummy;

  let carry = 0;
  while (p1 && p2) {
    const current = p1.val + p2.val + carry;
    head.next = new ListNode(current % 10, null);
    carry = 0;
    if (Math.floor(current / 10) >= 1) {
      carry += 1;
    }
    head = head.next;
    p1 = p1.next;
    p2 = p2.next;
  }

  while (p1) {
    const current = p1.val + carry;
    head.next = new ListNode(current % 10, null);
    carry = 0;
    if (Math.floor(current / 10) >= 1) {
      carry += 1;
    }
    head = head.next;
    p1 = p1.next;
  }

  while (p2) {
    const current = p2.val + carry;
    head.next = new ListNode(current % 10, null);
    carry = 0;
    if (Math.floor(current / 10) >= 1) {
      carry += 1;
    }
    head = head.next;
    p2 = p2.next;
  }

  if (carry === 1) {
    head.next = new ListNode(1, null);
  }

  return dummy.next;
}
