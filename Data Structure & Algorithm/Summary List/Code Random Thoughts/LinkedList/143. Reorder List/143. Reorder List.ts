// 143. Reorder List

// You are given the head of a singly linked-list. The list can be represented as:

// L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.

// Example 1:
// Input: head = [1,2,3,4]
// Output: [1,4,2,3]

// Example 2:
// Input: head = [1,2,3,4,5]
// Output: [1,5,2,4,3]

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 Do not return anything, modify head in-place instead.
 */
export function reorderList(head: ListNode | null): void {
  if (head === null) {
    return;
  }
  const helperArr: ListNode[] = [];
  let curNode: ListNode | null = head;

  while (curNode !== null) {
    helperArr.push(curNode);
    curNode = curNode.next;
  }

  let node: ListNode = head;
  let left: number = 1;
  let right: number = helperArr.length - 1;
  let count: number = 0;

  while (left <= right) {
    if (count % 2 === 0) {
      node.next = helperArr[right--];
    } else {
      node.next = helperArr[left++];
    }
    count++;
    node = node.next;
  }

  node.next = null;
}
