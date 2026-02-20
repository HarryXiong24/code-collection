// 寻找无环单链表的中点

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

export function isMiddle(head: ListNode | null): ListNode | null {
  let fast: ListNode | null;
  let slow: ListNode | null;
  fast = slow = head;
  // 因为 fast 始终是 slow 的两倍，所以当 fast 走完的时候，slow 刚好是 fast 的一半，即链表中点
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
  }
  return slow;
}