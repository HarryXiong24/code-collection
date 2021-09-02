// 单链表

// 节点接口
interface INode {
  element: number;
  next: INode | null;
}

// 链表节点类
class Node implements INode {
  public element: number;
  public next: INode | null = null;

  constructor(element: number, next: INode | null = null) {
    this.element = element;
    this.next = next;
  }
}

// 链表类
export class MyLinkedList {
  // 头指针
  public head: INode;
  // 链表长度
  public length: number;

  constructor() {
    this.head = new Node(-1, null);
    // length属性做边界判断
    this.length = 0;
  }

  // 根据索引获取对应值
  get(index: number): number {
    // 链表为空
    if (this.head.next === null) {
      return -1;
    }

    let count = 0;
    let temp = this.head.next;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    return temp.element;
  }

  // 头部添加
  addAtHead(val: number): void {
    let newNode = new Node(val, null);

    newNode.next = this.head.next;
    this.head.next = newNode;

    this.length++;
  }

  // 尾部添加
  addAtTail(val: number): void {
    let newNode = new Node(val, null);

    let temp = this.head;

    while (temp.next !== null) {
      temp = temp.next;
    }

    temp.next = newNode;
    this.length++;
  }

  // 根据索引位置添加
  addAtIndex(index: number, val: number): void {
    let newNode = new Node(val, null);

    // 大于则不操作
    if (index > this.length) {
      return;
    }

    // 等于则插入尾部
    if ((index = this.length)) {
      this.addAtTail(val);
      return;
    }

    // 小于0则插入头部
    if (index < 0) {
      this.addAtHead(val);
      return;
    }

    let temp = this.head;
    let count = 0;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    newNode.next = temp.next;
    temp.next = newNode;
    this.length++;
  }

  // 根据索引删除
  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.length - 1) {
      return;
    }

    let temp = this.head;
    let count = 0;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    temp.next = (<Node>temp.next).next;
    this.length--;
  }

  // 打印链表
  printLinkList(): Array<number> {
    let temp = new Node(-1, null);
    let res: Array<number> = [];

    if (this.head.next === null) {
      return res;
    }

    temp = <Node>this.head.next;

    while (temp !== null) {
      res.push(temp.element);
      temp = <Node>temp.next;
    }

    return res;
  }

  // 获取链表长度
  printLength(): number {
    return this.length;
  }
}

// test
let linkedList = new MyLinkedList();
console.log(linkedList.addAtHead(1));
console.log(linkedList.addAtTail(3));
console.log(linkedList.addAtIndex(1, 2)); //链表变为1-> 2-> 3
console.log(linkedList.get(1)); //返回2
console.log(linkedList.printLinkList());
console.log(linkedList.deleteAtIndex(1)); //现在链表是1-> 3
console.log(linkedList.get(1)); //返回3
console.log(linkedList.printLinkList());
