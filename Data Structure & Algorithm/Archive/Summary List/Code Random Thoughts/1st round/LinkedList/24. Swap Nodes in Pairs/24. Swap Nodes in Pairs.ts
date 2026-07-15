// 24. Swap Nodes in Pairs

// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]

// Example 2:
// Input: head = []
// Output: []

// Example 3:
// Input: head = [1]
// Output: [1]

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function swapPairs(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  const dummyNode = new ListNode(0, head);
  let slow = dummyNode;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    const nextGroup: ListNode | null = fast.next.next;

    slow.next = fast.next;
    fast.next.next = fast;
    fast.next = nextGroup;
    slow = fast;
    fast = nextGroup;
  }

  return dummyNode.next;
}
