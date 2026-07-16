// 445. Add Two Numbers II

// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:
// Input: l1 = [7,2,4,3], l2 = [5,6,4]
// Output: [7,8,0,7]

// Example 2:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [8,0,7]

// Example 3:
// Input: l1 = [0], l2 = [0]
// Output: [0]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function add(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const reverseLinkedList = (head: ListNode | null) => {
    if (!head) {
      return null;
    }
    let previous: ListNode | null = null;
    let current: ListNode | null = head;

    while (current) {
      const next = current.next as ListNode;
      current.next = previous;
      previous = current;
      current = next;
    }

    return previous;
  };

  l1 = reverseLinkedList(l1);
  l2 = reverseLinkedList(l2);

  return reverseLinkedList(add(l1, l2));
}
