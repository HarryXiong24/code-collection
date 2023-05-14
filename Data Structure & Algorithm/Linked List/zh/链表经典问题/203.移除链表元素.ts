// 203 移除链表元素

/**
 * 给你一个链表的头节点 head 和一个整数 val
 * 请你删除链表中所有满足 Node.val == val 的节点，并返回新的头节点
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

// 要牢记链表删除指定位置的时候，使用 const vHead: ListNode = new ListNode(0, head) 这种方法
export function removeElements(
  head: ListNode | null,
  val: number
): ListNode | null {
  const vHead: ListNode = new ListNode(0, head);
  let current: ListNode | null = head;
  let previous: ListNode | null = vHead;
  if (head === null) {
    return null;
  }
  while (current !== null) {
    if (current!.val === val) {
      previous!.next = previous!.next!.next;
      current = previous!.next;
      continue;
    }
    current = current!.next;
    previous = previous!.next;
  }

  return vHead.next;
}
