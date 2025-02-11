// 23. Merge k Sorted Lists

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

// Merge all the linked-lists into one sorted linked-list and return it.

// Example 1:
// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted list:
// 1->1->2->3->4->4->5->6

// Example 2:
// Input: lists = []
// Output: []

// Example 3:
// Input: lists = [[]]
// Output: []

//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const queue: ListNode[] = [];
  const dummyNode = new ListNode(0, null);

  let node = dummyNode;

  for (const item of lists) {
    if (item !== null) {
      queue.push(item);
    }
  }

  while (queue.length > 0) {
    queue.sort((list1, list2) => {
      return list1.val - list2.val;
    });

    const min = queue.shift()!;
    node.next = min;
    node = node.next;

    if (min.next !== null) {
      queue.push(min.next);
    }
  }

  return dummyNode.next;
}
