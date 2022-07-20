// 328 奇偶链表

/**
 * 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起
 * 请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性
 * 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数
 * 示例:
 * 输入: 1->2->3->4->5->NULL
 * 输出: 1->3->5->2->4->NULL
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

// 奇数一串，偶数一串，最后合并
export function oddEvenList(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }
  let odd: ListNode | null = head;
  const evenHead: ListNode | null = head.next;
  let even: ListNode | null = evenHead;
  // 分奇偶串
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  // 合并
  odd.next = evenHead;
  return head;
}
