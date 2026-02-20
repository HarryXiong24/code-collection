// 92. Reverse Linked List II

// Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

// Example 1:
// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]

// Example 2:
// Input: head = [5], left = 1, right = 1
// Output: [5]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function getMid(head: ListNode | null): ListNode | null {
  let midPrev: ListNode | null = null;
  while (head && head.next) {
    if (!midPrev) {
      midPrev = head;
    } else {
      midPrev = midPrev.next;
    }
    head = head.next!.next;
  }
  const mid = midPrev!.next;
  midPrev!.next = null;
  return mid;
}

function merge(list1: ListNode | null, list2: ListNode | null) {
  const dummyNode = new ListNode();
  let tail = dummyNode;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  if (list1) {
    tail.next = list1;
  } else {
    tail.next = list2;
  }

  return dummyNode.next;
}

export function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }
  const mid = getMid(head);
  const left = sortList(head);
  const right = sortList(mid);
  return merge(left, right);
}
