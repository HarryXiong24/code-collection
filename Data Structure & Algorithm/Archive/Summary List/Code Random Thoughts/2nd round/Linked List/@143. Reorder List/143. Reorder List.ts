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
  if (!head) {
    return;
  }

  const arr: number[] = [];
  let node: ListNode | null = head;

  while (node) {
    arr.push(node.val);
    node = node.next;
  }

  node = head;
  let count = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    if (count % 2 === 0) {
      node!.val = arr[left];
      left++;
    } else {
      node!.val = arr[right];
      right--;
    }
    count++;
    node = node!.next;
  }
}
