// 86. Partition List

// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.

// Example 1:
// Input: head = [1,4,3,2,5,2], x = 3
// Output: [1,2,2,4,3,5]

// Example 2:
// Input: head = [2,1], x = 2
// Output: [1,2]

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function partition(head: ListNode | null, x: number): ListNode | null {
  const dummyNode = new ListNode(0, null);
  const oldNode = new ListNode(0, head);

  let old = oldNode;
  let node = dummyNode;

  while (old.next) {
    if (old.next.val < x) {
      node.next = old.next;
      old.next = old.next.next;
      node = node.next;
    } else {
      old = old.next;
    }
  }

  node.next = oldNode.next;

  return dummyNode.next;
}
