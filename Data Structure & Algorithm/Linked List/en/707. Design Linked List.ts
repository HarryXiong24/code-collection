// 707. Design Linked List

// Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
// A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node.
// If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

// Implement the MyLinkedList class:

// MyLinkedList() Initializes the MyLinkedList object.
// int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
// void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
// void addAtTail(int val) Append a node of value val as the last element of the linked list.
// void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
// void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.

// Example 1:

// Input
// ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
// [[], [1], [3], [1, 2], [1], [1], [1]]
// Output
// [null, null, null, null, 2, null, 3]

// Explanation
// MyLinkedList myLinkedList = new MyLinkedList();
// myLinkedList.addAtHead(1);
// myLinkedList.addAtTail(3);
// myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
// myLinkedList.get(1);              // return 2
// myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
// myLinkedList.get(1);              // return 3

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// 节点接口
interface ILinkedNode {
  element: number;
  next: ILinkedNode | null;
}

class LinkedNode implements ILinkedNode {
  public element: number;
  public next: ILinkedNode | null;

  constructor(element: number, next: ILinkedNode | null = null) {
    this.element = element;
    this.next = next;
  }
}

class MyLinkedList {
  head: ILinkedNode | null;
  length: number;

  constructor() {
    this.head = new LinkedNode(-1, null);
    this.length = 0;
  }

  get(index: number): number {
    // linked list is empty
    if (this.head!.next === null) {
      return -1;
    }

    let count = 0;
    let temp = this.head!.next;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    if (index >= this.length) {
      return -1;
    } else {
      return temp.element;
    }
  }

  addAtHead(val: number): void {
    const newNode = new LinkedNode(val, null);
    newNode.next = this.head!.next;
    this.head!.next = newNode;
    this.length++;
  }

  addAtTail(val: number): void {
    let temp = this.head;
    const newNode = new LinkedNode(val, null);
    while (temp!.next !== null) {
      temp = temp!.next;
    }
    newNode.next = temp!.next;
    temp!.next = newNode;
    this.length++;
  }

  addAtIndex(index: number, val: number): void {
    // if index more than length, then do nothing
    if (index > this.length) {
      return;
    }

    // if index equal length, then insert in tail
    if (index === this.length) {
      this.addAtTail(val);
      return;
    }

    // if index less than 0, then insert in head
    if (index < 0) {
      this.addAtHead(val);
      return;
    }
    let count = 0;
    let temp = this.head;
    const newNode = new LinkedNode(val, null);

    while (temp!.next !== null && count !== index) {
      temp = temp!.next;
      count++;
    }

    newNode.next = temp!.next;
    temp!.next = newNode;
    this.length++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.length - 1) {
      return;
    }

    let count = 0;
    let temp = this.head;
    while (temp!.next !== null && count !== index) {
      temp = temp!.next;
      count++;
    }

    const deleteNode = temp!.next;
    temp!.next = deleteNode!.next;
    this.length--;
  }

  // 打印链表
  printLinkList(): number[] {
    let temp = new LinkedNode(-1, null);
    let res: number[] = [];

    if (this.head!.next === null) {
      return res;
    }

    temp = this.head!.next;

    while (temp !== null) {
      res.push(temp.element);
      temp = temp.next!;
    }

    return res;
  }
}

// test
const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
console.log(myLinkedList.get(1));
console.log(myLinkedList.printLinkList());
myLinkedList.addAtTail(3);
console.log(myLinkedList.printLinkList());
myLinkedList.addAtIndex(1, 2); // linked list becomes 1->2->3
console.log(myLinkedList.printLinkList());
console.log(myLinkedList.get(1)); // return 2
myLinkedList.deleteAtIndex(1); // now the linked list is 1->3
console.log(myLinkedList.printLinkList());
console.log(myLinkedList.get(1)); // return 3
