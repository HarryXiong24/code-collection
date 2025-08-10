// 82. Remove Duplicates from Sorted List II

// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

// Example 1:
// Input: head = [1,2,3,3,4,4,5]
// Output: [1,2,5]

// Example 2:
// Input: head = [1,1,1,2,3]
// Output: [2,3]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function deleteDuplicates(head: ListNode | null): ListNode | null {
  let dummyUniq = new ListNode(-1);
  let dummyDup = new ListNode(-1);

  if (!head) {
    return null;
  }

  let pUniq: ListNode | null = dummyUniq;
  let pDup: ListNode | null = dummyDup;
  let node: ListNode | null = head;

  while (node) {
    if ((node.next && node.val === node.next.val) || node.val === pDup.val) {
      pDup.next = node;
      pDup = pDup.next!;
    } else {
      pUniq.next = node;
      pUniq = pUniq.next!;
    }

    node = node.next;
    pDup.next = null;
    pUniq.next = null;
  }

  return dummyUniq.next;
}
