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

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// recursive
export function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }

  const recursive = (node: ListNode | null): ListNode | null => {
    if (node === null || node.next === null) {
      return node;
    }

    const nextGroupNode = recursive(node.next.next);
    const secondNode = node.next;
    node.next = nextGroupNode;
    secondNode.next = node;
    return secondNode;
  };

  head = recursive(head);

  return head;
}

// iterative
export function swapPairs1(head: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(0, head);
  let prev = dummyHead;
  let cur = head;

  if (!head) {
    return head;
  }

  while (cur) {
    const next = cur.next;
    const nextGroup = next?.next;

    if (!next) {
      break;
    }

    next.next = cur;
    cur.next = nextGroup!;
    prev.next = next;
    prev = cur;
    cur = nextGroup!;
  }

  return dummyHead.next;
}
