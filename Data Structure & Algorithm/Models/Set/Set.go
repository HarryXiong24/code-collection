// 集合

/**
 * 功能
 * 1.向集合添加一个新元素
 * 2.从集合移除一个元素
 * 3.如果元素在集合中，返回 true，否则返回 false
 * 4.移除集合中的所有元素
 * 5.返回集合所包含元素的数量
 * 6.返回一个包含集合中所有值（元素）的数组
 * 7.返回与其他集合的并集
 * 8.返回与其他集合的交集
 * 9.返回与其他集合的差集
 * 10.返回是否为其他集合的子集
 * 11.判断集合是否为空
 * 12.将 Set 转换成 AdvancedSet
 * 13.将 AdvancedSet 转换成 Set
 */

package main

import (
	"fmt"
)

// AdvancedSet represents a set data structure
type AdvancedSet[T comparable] struct {
	items map[T]struct{}
}

// NewAdvancedSet initializes a new AdvancedSet
func NewAdvancedSet[T comparable](arr ...T) *AdvancedSet[T] {
	set := &AdvancedSet[T]{items: make(map[T]struct{})}
	for _, item := range arr {
		set.items[item] = struct{}{}
	}
	return set
}

// Add adds a new element to the set
func (set *AdvancedSet[T]) Add(value T) bool {
	if _, exists := set.items[value]; exists {
		return false
	}
	set.items[value] = struct{}{}
	return true
}

// Delete removes an element from the set
func (set *AdvancedSet[T]) Delete(value T) bool {
	if _, exists := set.items[value]; exists {
		delete(set.items, value)
		return true
	}
	return false
}

// Has checks if the set contains the given element
func (set *AdvancedSet[T]) Has(value T) bool {
	_, exists := set.items[value]
	return exists
}

// Clear removes all elements from the set
func (set *AdvancedSet[T]) Clear() {
	set.items = make(map[T]struct{})
}

// IsEmpty checks if the set is empty
func (set *AdvancedSet[T]) IsEmpty() bool {
	return set.Size() == 0
}

// Size returns the number of elements in the set
func (set *AdvancedSet[T]) Size() int {
	return len(set.items)
}

// ToArray returns an array of all elements in the set
func (set *AdvancedSet[T]) ToArray() []T {
	arr := make([]T, 0, len(set.items))
	for value := range set.items {
		arr = append(arr, value)
	}
	return arr
}

// ToAdvancedSet converts a built-in set to an AdvancedSet
func ToAdvancedSet[T comparable](paramSet map[T]struct{}) *AdvancedSet[T] {
	advancedSet := &AdvancedSet[T]{items: paramSet}
	return advancedSet
}

// ToSet converts an AdvancedSet to a built-in set
func (set *AdvancedSet[T]) ToSet() map[T]struct{} {
	newSet := make(map[T]struct{})
	for value := range set.items {
		newSet[value] = struct{}{}
	}
	return newSet
}

// Union returns the union of the set with another set
func (set *AdvancedSet[T]) Union(paramSet *AdvancedSet[T]) *AdvancedSet[T] {
	unionSet := NewAdvancedSet[T]()
	for value := range set.items {
		unionSet.items[value] = struct{}{}
	}
	for value := range paramSet.items {
		unionSet.items[value] = struct{}{}
	}
	return unionSet
}

// Intersection returns the intersection of the set with another set
func (set *AdvancedSet[T]) Intersection(paramSet *AdvancedSet[T]) *AdvancedSet[T] {
	intersectionSet := NewAdvancedSet[T]()
	for value := range set.items {
		if paramSet.Has(value) {
			intersectionSet.items[value] = struct{}{}
		}
	}
	return intersectionSet
}

// Difference returns the difference of the set with another set
func (set *AdvancedSet[T]) Difference(paramSet *AdvancedSet[T]) *AdvancedSet[T] {
	differenceSet := NewAdvancedSet[T]()
	for value := range set.items {
		if !paramSet.Has(value) {
			differenceSet.items[value] = struct{}{}
		}
	}
	return differenceSet
}

// IsSubsetOf checks if the set is a subset of another set
func (set *AdvancedSet[T]) IsSubsetOf(paramSet *AdvancedSet[T]) bool {
	for value := range set.items {
		if !paramSet.Has(value) {
			return false
		}
	}
	return true
}

func main() {
	advancedSet := NewAdvancedSet(1, 2, 8, 9)
	fmt.Println("Array:", advancedSet.ToArray())
	fmt.Println("Difference:", advancedSet.Difference(NewAdvancedSet(1)).ToArray())
	fmt.Println("Intersection:", advancedSet.Intersection(NewAdvancedSet(1)).ToArray())
	fmt.Println("Union:", advancedSet.Union(NewAdvancedSet(10, 5)).ToArray())
	fmt.Println("IsSubsetOf:", advancedSet.IsSubsetOf(NewAdvancedSet(10, 5)))
}