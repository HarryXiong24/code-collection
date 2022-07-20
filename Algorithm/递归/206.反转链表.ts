// 206 反转链表

/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
 * head = [1,2,3,4,5]
 * [5,4,3,2,1]
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

export function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) {
    return head;
  }
  if (head.next === null) {
    return head;
  }
  const newLink = reverseList(head.next);
  const temp = head.next;
  temp.next = head;
  head.next = null;
  return newLink;
}
