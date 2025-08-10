// 19. Remove Nth Node From End of List

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) {
    return null;
  }

  const dummyNode = new ListNode(0, head);

  let p1: ListNode = dummyNode;
  let p2: ListNode | null = dummyNode;

  for (let i = n; i > 0; i--) {
    if (p2) {
      p2 = p2.next;
    }
  }

  if (!p2) {
    return null;
  }

  while (p2.next) {
    p1 = p1.next!;
    p2 = p2.next;
  }

  p1.next = p1!.next!.next;

  return dummyNode.next;
}
