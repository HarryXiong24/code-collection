// 25. Reverse Nodes in k-Group

// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]

// Example 2:
// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverse(head: ListNode | null, n: number): ListNode | null {
  if (!head) {
    return null;
  }

  let pre: ListNode | null = null;
  let current: ListNode | null = head;
  let count = 0;

  while (count < n && current) {
    const next: ListNode | null = current.next;
    current.next = pre;
    pre = current;
    current = next;
    count++;
  }

  head.next = current;
  return pre;
}

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head) {
    return null;
  }

  let a = head;
  let b = head;

  // 将 b 指向下一组待反转的头结点
  for (let i = 0; i < k; i++) {
    // 不足 k 个，不需要反转了
    if (!b) {
      return head!;
    }
    b = b.next!;
  }

  // 反转前 k 个元素
  const newHead = reverse(a, k);

  // 此时 b 指向下一组待反转的头结点
  // 递归反转后续链表并连接起来
  a.next = reverseKGroup(b, k);

  return newHead;
}
