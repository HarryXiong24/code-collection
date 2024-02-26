// 1019. Next Greater Node In Linked List

// For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

// Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

// Example 1:
// Input: head = [2,1,5]
// Output: [5,5,0]

// Example 2:
// Input: head = [2,7,4,3,5]
// Output: [7,0,5,5,0]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// O(n^2), but it can be O(n), see the python solution
export function nextLargerNodes(head: ListNode | null): number[] {
  const res: number[] = [];
  let slow = head;
  let fast = slow;

  while (slow !== null) {
    const cur = slow.val;
    fast = slow.next;
    let isLarge = false;
    while (fast !== null) {
      if (fast.val > cur) {
        res.push(fast.val);
        isLarge = true;
        break;
      }
      fast = fast.next;
    }
    if (isLarge === false) {
      res.push(0);
    }
    slow = slow.next;
  }

  return res;
}
