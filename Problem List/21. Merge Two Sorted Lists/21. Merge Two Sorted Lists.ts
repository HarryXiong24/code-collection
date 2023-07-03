// 21. Merge Two Sorted Lists

// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

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

// Non-recursive
export function mergeTwoLists_non_recursive(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const newList = new ListNode(0, null);
  let newHead = newList;
  let head1 = list1;
  let head2 = list2;

  while (head1 !== null && head2 !== null) {
    if (head1.val <= head2.val) {
      const newNode = new ListNode(head1.val, null);
      newHead.next = newNode;
      newHead = newHead.next;
      head1 = head1.next;
    } else {
      const newNode = new ListNode(head2.val, null);
      newHead.next = newNode;
      newHead = newHead.next;
      head2 = head2.next;
    }
  }

  if (head1) {
    newHead.next = head1;
  }
  if (head2) {
    newHead.next = head2;
  }

  return newList.next;
}

// Recursive
export function mergeTwoLists_recursive(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const newList = new ListNode(0, null);
  let newHead = newList;

  const recursive = (node1: ListNode | null, node2: ListNode | null) => {
    if (node1 && !node2) {
      newHead.next = node1;
    }

    if (!node1 && node2) {
      newHead.next = node2;
    }

    if (!node1 && !node2) {
      newHead.next = null;
    }

    if (node1 && node2) {
      if (node1.val <= node2.val) {
        const newNode = new ListNode(node1.val, null);
        newHead.next = newNode;
        newHead = newHead.next;
        recursive(node1!.next, node2);
      } else {
        const newNode = new ListNode(node2.val, null);
        newHead.next = newNode;
        newHead = newHead.next;
        recursive(node1, node2!.next);
      }
    }
  };

  recursive(list1, list2);

  return newList.next;
}
