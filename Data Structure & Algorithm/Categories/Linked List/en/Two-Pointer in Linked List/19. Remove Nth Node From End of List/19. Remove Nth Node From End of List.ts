// 19. Remove Nth Node From End of List

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let length = 0;
  let temp = head;
  while (temp !== null) {
    length++;
    temp = temp.next;
  }

  // boundary
  if (n > length || n < 0) {
    return null;
  }
  if (n === length) {
    head = head!.next;
    return head;
  }
  if (n === 0) {
    return head;
  }

  // initial index is 1, pos is in the front of delete element
  const pos = length - n;
  temp = head;
  let count = 0;
  while (count !== pos - 1 && temp !== null) {
    count++;
    temp = temp.next;
  }
  (temp as ListNode).next = temp!.next!.next;
  return head;
}

// there is a specific rule, when need to remove the n th node from the end of the list, you can let one pointer move n steps from the beginning of the list, and when X continue move until the end, the distance traveled is the node from the beginning distance when counting.
// achieve this rule can use double pointer.
export function removeNthFromEnd1(head: ListNode | null, n: number): ListNode | null {
  let fast: ListNode | null;
  let slow: ListNode | null;
  // it is possible to delete the head node, so set up a virtual head node to ensure that all nodes are processed in the same way.
  const vHead = new ListNode(0, head);
  fast = head;
  // record the previous node of the last nth node
  slow = vHead;
  while (n > 0) {
    fast = fast!.next;
    n--;
  }
  while (fast !== null) {
    fast = fast!.next;
    slow = slow!.next;
  }
  slow!.next = slow!.next!.next;
  // the final return should return vHead.next, not head
  return vHead.next;
}
