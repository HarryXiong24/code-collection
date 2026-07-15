// 19 删除链表的倒数第 N 个结点

/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let fast: ListNode | null;
  let slow: ListNode | null;
  const vHead = new ListNode(0, head);
  fast = head;
  slow = vHead; // 因为要找到倒数第 n 个结点的前一个结点
  while (n > 0) {
    fast = fast!.next;
    n--;
  }
  while (fast !== null) {
    fast = fast!.next;
    slow = slow!.next;
  }
  slow!.next = slow!.next!.next;
  // 涉及到删除节点，有可能删除头节点，所以设一个虚拟头节点，保证对所有节点的处理方式都一样。
  // 所以最后返回应该返回 vHead.next，而不是 head
  return vHead.next;
}
