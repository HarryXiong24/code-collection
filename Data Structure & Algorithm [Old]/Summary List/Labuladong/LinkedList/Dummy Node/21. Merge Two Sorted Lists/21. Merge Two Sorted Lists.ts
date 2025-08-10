// 21. Merge Two Sorted Lists

// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.

// Example 1:
// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]

// Example 2:
// Input: list1 = [], list2 = []
// Output: []

// Example 3:
// Input: list1 = [], list2 = [0]
// Output: [0]

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummyNode = new ListNode(0, null);

  let p1 = list1;
  let p2 = list2;
  let node = dummyNode;

  while (p1 && p2) {
    if (p1.val <= p2.val) {
      node.next = p1;
      p1 = p1.next;
      node = node.next;
    } else {
      node.next = p2;
      p2 = p2.next;
      node = node.next;
    }
  }

  if (p1) {
    node.next = p1;
  }

  if (p2) {
    node.next = p2;
  }

  return dummyNode;
}

// Readers often ask me when to use a dummy node.
// Here is a summary: When you need to create a new linked list, you can use a dummy node to simplify handling edge cases.

// 当你需要创造一条新链表的时候，可以使用虚拟头结点简化边界情况的处理。
// 比如说，让你把两条有序链表合并成一条新的有序链表，是不是要创造一条新链表？再比你想把一条链表分解成两条链表，是不是也在创造新链表？
// 这些情况都可以使用虚拟头结点简化边界情况的处理。
