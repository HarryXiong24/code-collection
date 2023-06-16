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

// Recursion
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const head = new ListNode();

  const recursive = (node1: ListNode | null, node2: ListNode | null, res: ListNode) => {
    if (!node1 && !node2) {
      return;
    }

    if (!node1 && node2) {
      res.next = node2;
      return;
    }

    if (node1 && !node2) {
      res.next = node1;
      return;
    }

    if (node1 && node2) {
      if (node1.val < node2.val) {
        const newNode = new ListNode(node1.val);
        res.next = newNode;
        recursive(node1.next, node2, res.next);
      } else {
        const newNode = new ListNode(node2.val);
        res.next = newNode;
        recursive(node1, node2.next, res.next);
      }
    }
  };

  let res = head;
  recursive(list1, list2, res);

  return head.next;
}
