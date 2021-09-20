// 160 相交链表

/*
 * 给你两个单链表的头节点 headA 和 headB
 * 请你找出并返回两个单链表相交的起始节点
 * 如果两个链表没有交点，返回 null
 */

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // 先判断是否有一个为空
  if (headA === null || headB === null) {
    return null;
  }
  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;
  // 如果会相交，则一定会相遇
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}
