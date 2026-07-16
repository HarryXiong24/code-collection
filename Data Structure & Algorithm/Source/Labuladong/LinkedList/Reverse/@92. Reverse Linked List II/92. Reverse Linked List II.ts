// 92. Reverse Linked List II

// Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

// Example 1:
// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]

// Example 2:
// Input: head = [5], left = 1, right = 1
// Output: [5]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head) {
    return null;
  }

  let dummy: ListNode = new ListNode(0, head);
  let beforeBegin: ListNode | null = dummy;

  for (let i = 1; i < left; i++) {
    beforeBegin = beforeBegin.next!;
  }

  let pre: ListNode | null = null;
  let current: ListNode | null = beforeBegin.next;
  let begin: ListNode | null = current;

  for (let i = 0; i <= right - left; i++) {
    let next = current!.next;
    current!.next = pre;
    pre = current;
    current = next;
  }

  begin!.next = current;
  beforeBegin.next = pre;

  return dummy.next;
}
