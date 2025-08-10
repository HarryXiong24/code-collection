// 24 两两交换链表中的节点

/**
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function swapPairs(head: ListNode | null): ListNode | null {
  // 终止条件
  if (head == null || head.next == null) {
    return head;
  }
  // 递归前
  const next = head.next;
  // 递归中
  head.next = swapPairs(next.next);
  // 递归后
  next.next = head;
  return next;
}
