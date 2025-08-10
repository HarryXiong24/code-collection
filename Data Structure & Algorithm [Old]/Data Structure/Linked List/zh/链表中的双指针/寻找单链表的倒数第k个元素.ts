// 寻找单链表的倒数第 k 个元素

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

// 画图一目了然整个过程
export function findIndex(head: ListNode | null, k: number): ListNode | null {
  let fast: ListNode | null;
  let slow: ListNode | null;
  fast = slow = head;
  while ( k-- > 0) {
    fast = fast!.next;
  }
  while (fast !== null) {
    fast = fast.next
    slow = slow!.next;
  }
  return slow;
}