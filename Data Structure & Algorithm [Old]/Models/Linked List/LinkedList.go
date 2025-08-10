package main

import "fmt"

// Node represents a node in the linked list
type Node struct {
	element int
	next    *Node
}

// LinkedList represents the linked list
type LinkedList struct {
	head          *Node
	length        int
	initHeadValue int
}

// NewLinkedList initializes a new linked list
func NewLinkedList(initHeadValue int) *LinkedList {
	return &LinkedList{
		head:          &Node{element: initHeadValue, next: nil},
		length:        0,
		initHeadValue: initHeadValue,
	}
}

// Get retrieves the value at the given index
func (list *LinkedList) Get(index int) int {
	if list.head.next == nil {
		return -1
	}

	count := 0
	temp := list.head.next

	for temp.next != nil && count != index {
		count++
		temp = temp.next
	}

	if index >= list.length {
		return -1
	} else {
		return temp.element
	}
}

// AddAtHead adds a value at the head of the list
func (list *LinkedList) AddAtHead(val int) {
	newNode := &Node{element: val, next: nil}
	newNode.next = list.head.next
	list.head.next = newNode
	list.length++
}

// AddAtTail adds a value at the tail of the list
func (list *LinkedList) AddAtTail(val int) {
	newNode := &Node{element: val, next: nil}
	temp := list.head

	for temp.next != nil {
		temp = temp.next
	}

	temp.next = newNode
	list.length++
}

// AddAtIndex adds a value at the specified index
func (list *LinkedList) AddAtIndex(index int, val int) {
	newNode := &Node{element: val, next: nil}

	if index > list.length {
		return
	}

	if index == list.length {
		list.AddAtTail(val)
		return
	}

	if index < 0 {
		list.AddAtHead(val)
		return
	}

	temp := list.head
	count := 0

	for temp.next != nil && count != index {
		count++
		temp = temp.next
	}

	newNode.next = temp.next
	temp.next = newNode
	list.length++
}

// DeleteAtIndex deletes the node at the specified index
func (list *LinkedList) DeleteAtIndex(index int) {
	if index < 0 || index > list.length-1 {
		return
	}

	temp := list.head
	count := 0

	for temp.next != nil && count != index {
		count++
		temp = temp.next
	}

	temp.next = temp.next.next
	list.length--
}

// PrintLinkedList prints the linked list
func (list *LinkedList) PrintLinkedList() []int {
	temp := &Node{element: list.initHeadValue, next: nil}
	res := []int{}

	if list.head.next == nil {
		return res
	}

	temp = list.head.next

	for temp != nil {
		res = append(res, temp.element)
		temp = temp.next
	}

	return res
}

// PrintLength returns the length of the linked list
func (list *LinkedList) PrintLength() int {
	return list.length
}

// Clear clears the linked list
func (list *LinkedList) Clear() {
	list.head = nil
	list.length = 0
}

func main() {
	linkedList := NewLinkedList(-1)
	linkedList.AddAtHead(1)
	linkedList.AddAtTail(3)
	linkedList.AddAtIndex(1, 2) //链表变为1-> 2-> 3
	fmt.Println(linkedList.Get(1)) //返回2
	fmt.Println(linkedList.PrintLinkedList())
	linkedList.DeleteAtIndex(1) //现在链表是1-> 3
	fmt.Println(linkedList.Get(1)) //返回3
	fmt.Println(linkedList.PrintLinkedList())
}