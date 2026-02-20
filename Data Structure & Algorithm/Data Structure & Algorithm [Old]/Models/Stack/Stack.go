// 栈

/**
 * 功能
 * 1.入栈
 * 2.出栈
 * 3.返回栈顶元素
 * 4.判断栈是否为空
 * 5.返回栈里元素的个数
 * 6.清空栈
 */

package main

import "fmt"

// Stack represents a stack data structure
type Stack[T any] struct {
	items []T
}

// NewStack initializes a new stack
func NewStack[T any]() *Stack[T] {
	return &Stack[T]{items: []T{}}
}

// Push adds an element to the top of the stack
func (s *Stack[T]) Push(value T) {
	s.items = append(s.items, value)
}

// Pop removes and returns the top element of the stack
func (s *Stack[T]) Pop() (T, bool) {
	if s.IsEmpty() {
		var zero T
		return zero, false
	}
	value := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return value, true
}

// Peek returns the top element of the stack without removing it
func (s *Stack[T]) Peek() (T, bool) {
	if s.IsEmpty() {
		var zero T
		return zero, false
	}
	return s.items[len(s.items)-1], true
}

// IsEmpty checks if the stack is empty
func (s *Stack[T]) IsEmpty() bool {
	return len(s.items) == 0
}

// Size returns the number of elements in the stack
func (s *Stack[T]) Size() int {
	return len(s.items)
}

// Clear removes all elements from the stack
func (s *Stack[T]) Clear() {
	s.items = []T{}
}

func main() {
	stack := NewStack[string]()
	fmt.Println("Is stack empty?", stack.IsEmpty())
	value, ok := stack.Peek()
	if !ok {
		fmt.Println("Peek failed, stack is empty")
	} else {
		fmt.Println("Peek:", value)
	}

	stack.Push("1")
	stack.Push("5")
	value, ok = stack.Peek()
	if !ok {
		fmt.Println("Peek failed, stack is empty")
	} else {
		fmt.Println("Peek:", value)
	}
	fmt.Println("Stack size:", stack.Size())

	poppedValue, ok := stack.Pop()
	if !ok {
		fmt.Println("Pop failed, stack is empty")
	} else {
		fmt.Println("Popped value:", poppedValue)
	}
	fmt.Println("Stack size after pop:", stack.Size())
}