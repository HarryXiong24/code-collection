// 141 环形链表2

// 已知链表中含有环，返回这个环的起始位置

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

function detectCycle(head: ListNode | null): ListNode | null {
  let fast: ListNode | null;
  let slow: ListNode | null;
  fast = slow = head;
  // 先判断是否有环，有环则 break
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      break;
    }
  }
  // 如果无环，退出循环经过此检验，返回 null
  // 这一步也可写进循环里面
  if (fast === null || fast.next === null) {
    return null;
  }
  // 然后先把一个指针重新指向 head
  fast = head;
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
}