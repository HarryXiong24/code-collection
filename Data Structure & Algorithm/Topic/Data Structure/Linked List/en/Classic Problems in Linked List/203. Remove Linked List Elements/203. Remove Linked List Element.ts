// 203. Remove Linked List Elements

// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

// Example 1:
// Input: head = [1,2,6,3,4,5,6], val = 6
// Output: [1,2,3,4,5]

// Example 2:
// Input: head = [], val = 1
// Output: []

// Example 3:
// Input: head = [7,7,7,7], val = 7
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

export function removeElements(head: ListNode | null, val: number): ListNode | null {
  // handle boundary
  if (head === null) {
    return null;
  }

  // it is very import to create a virtual head to solve boundary problem
  const vHead = new ListNode(-1, head);
  let current: ListNode | null = head;
  let previous: ListNode | null = vHead;

  while (current !== null) {
    if (current.val === val) {
      previous.next = current.next;
      current = current.next;
      continue;
    }
    previous = current;
    current = current.next;
  }

  return vHead.next;
}
