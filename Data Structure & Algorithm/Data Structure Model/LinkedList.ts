// 单链表

/**
 * 功能
 * 1.根据索引获取对应值
 * 2.头部添加
 * 3.尾部添加
 * 4.根据索引位置添加
 * 5.根据索引删除
 * 6.打印链表
 * 7.获取链表长度
 * 8.清空链表
 */

// 节点接口
interface INode<T> {
  element: T;
  next: INode<T> | null;
}

// 链表节点类
class Node<T> implements INode<T> {
  public element: T;
  public next: INode<T> | null;

  constructor(element: T, next: INode<T> | null = null) {
    this.element = element;
    this.next = next;
  }
}

// 链表类
export class LinkedList<T> {
  // 头指针
  public head?: INode<T>;
  // 链表长度
  public length: number;
  // 初始化值
  public initHeadValue: T;

  // 给链表初始化一个头指针
  constructor(initHeadValue: T) {
    this.head = new Node<T>(initHeadValue, null);
    // length属性做边界判断
    this.length = 0;
    this.initHeadValue = initHeadValue;
  }

  // 根据索引获取对应值
  get(index: number): T | null {
    // 链表为空
    if (this.head!.next === null) {
      return null;
    }

    let count = 0;
    let temp = this.head!.next;

    while (temp.next !== null && count !== index) {
      count++;
      temp = temp.next;
    }

    if (index >= this.length) {
      return null;
    } else {
      return temp.element;
    }
  }

  // 头部添加
  addAtHead(val: T): void {
    let newNode = new Node<T>(val, null);

    newNode.next = this.head!.next;
    this.head!.next = newNode;

    this.length++;
  }

  // 尾部添加
  addAtTail(val: T): void {
    let newNode = new Node<T>(val, null);

    let temp = this.head;

    while (temp!.next !== null) {
      temp = temp!.next;
    }

    temp!.next = newNode;
    this.length++;
  }

  // 根据索引位置添加
  addAtIndex(index: number, val: T): void {
    let newNode = new Node<T>(val, null);

    // 大于则不操作
    if (index > this.length) {
      return;
    }

    // 等于则插入尾部
    if (index === this.length) {
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

    while (temp!.next !== null && count !== index) {
      count++;
      temp = temp!.next;
    }

    newNode.next = temp!.next;
    temp!.next = newNode;
    this.length++;
  }

  // 根据索引删除
  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.length - 1) {
      return;
    }

    let temp = this.head;
    let count = 0;

    while (temp!.next !== null && count !== index) {
      count++;
      temp = temp!.next;
    }

    temp!.next = temp!.next!.next;
    this.length--;
  }

  // 删除第一个出现 target
  // deleteValue(target: number): void {
  //   if (this.head!.next === null) {
  //     return;
  //   }

  //   let cur = this.head!.next;
  //   let prev = this.head!;

  //   while (cur.next !== null) {
  //     if (cur.element === target) {
  //       prev.next = cur.next;
  //     }
  //     cur = cur.next;
  //     prev = prev.next!;
  //   }
  // }

  // 打印链表
  printLinkList(): Array<T> {
    let temp = new Node<T>(this.initHeadValue, null);
    let res: Array<T> = [];

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

  // 获取链表长度
  printLength(): number {
    return this.length;
  }

  // 清空链表
  clear(): void {
    this.head = undefined;
    this.length = 0;
  }
}

// test
const linkedList = new LinkedList<number>(-1);
console.log(linkedList.addAtHead(1));
console.log(linkedList.addAtTail(3));
console.log(linkedList.addAtIndex(1, 2)); //链表变为1-> 2-> 3
console.log(linkedList.get(1)); //返回2
console.log(linkedList.printLinkList());
console.log(linkedList.deleteAtIndex(1)); //现在链表是1-> 3
console.log(linkedList.get(1)); //返回3
console.log(linkedList.printLinkList());
