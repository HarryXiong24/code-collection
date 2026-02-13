// 146. LRU Cache
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:
// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists.
// Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

// Example 1:
// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

package main

import (
	"fmt"
	"strings"
	"sync"
)

type DNode struct {
	key   int
	value int

	prev *DNode
	next *DNode
}

type LRUCache struct {
	capacity  int
	cache     map[int]*DNode
	dummyHead *DNode
	dummyTail *DNode
	lock      sync.Mutex
}

func NewDNode(key int, value int) *DNode {
	return &DNode{
		key:   key,
		value: value,
		prev:  nil,
		next:  nil,
	}
}

func NewLRUCache(capacity int) *LRUCache {
	dummyHead := NewDNode(0, 0)
	dummyTail := NewDNode(0, 0)

	dummyHead.next = dummyTail
	dummyTail.prev = dummyHead

	lruCache := &LRUCache{
		capacity:  capacity,
		cache:     map[int]*DNode{},
		dummyHead: dummyHead,
		dummyTail: dummyTail,
		lock:      sync.Mutex{},
	}
	return lruCache
}

func (lru *LRUCache) Get(key int) int {
	lru.lock.Lock()
	defer lru.lock.Unlock()
	if _, exists := lru.cache[key]; exists {
		node := lru.cache[key]
		lru.moveToHead(node)
		return node.value
	}

	return -1
}

func (lru *LRUCache) Put(key int, value int) {
	lru.lock.Lock()
	defer lru.lock.Unlock()
	if _, exists := lru.cache[key]; !exists {
		node := NewDNode(key, value)
		lru.cache[key] = node
		lru.addToHead(node)

		if len(lru.cache) > lru.capacity {
			removed := lru.removeTail()
			delete(lru.cache, removed.key)
		}
	} else {
		node := lru.cache[key]
		lru.moveToHead(node)
	}
}

func (lru *LRUCache) addToHead(node *DNode) {
	next := lru.dummyHead.next

	node.next = next
	next.prev = node
	lru.dummyHead.next = node
	node.prev = lru.dummyHead
}

func (lru *LRUCache) removeNode(node *DNode) *DNode {
	prev := node.prev
	next := node.next

	prev.next = node.next
	next.prev = node.prev

	return node
}

func (lru *LRUCache) removeTail() *DNode {
	tail := lru.dummyTail.prev
	removed := lru.removeNode(tail)
	return removed
}

func (lru *LRUCache) moveToHead(node *DNode) {
	// remove from tail
	removed := lru.removeNode(node)
	// add to tail
	lru.addToHead(removed)
}

func (c *LRUCache) getCacheString() string {
	var res []string
	curr := c.dummyHead.next
	for curr != c.dummyTail {
		res = append(res, fmt.Sprintf("[%d:%d]", curr.key, curr.value))
		curr = curr.next
	}
	if len(res) == 0 {
		return "{}"
	}
	return strings.Join(res, " <-> ")
}

func testLRU(title string, val interface{}, lru *LRUCache) {
	fmt.Printf("%-20s | 返回值: %-3v | 缓存状态: %s\n", title, val, lru.getCacheString())
}

func main() {
	lRUCache := NewLRUCache(2)

	fmt.Println("--- LRU TestCase Running ---")

	// 1. put(1, 1)
	lRUCache.Put(1, 1)
	testLRU("put(1, 1)", "nil", lRUCache)

	// 2. put(2, 2)
	lRUCache.Put(2, 2)
	testLRU("put(2, 2)", "nil", lRUCache)

	// 3. get(1)
	testLRU("get(1)", lRUCache.Get(1), lRUCache)

	// 4. put(3, 3)
	lRUCache.Put(3, 3)
	testLRU("put(3, 3)", "nil", lRUCache)

	// 5. get(2)
	testLRU("get(2)", lRUCache.Get(2), lRUCache)

	// 6. put(4, 4)
	lRUCache.Put(4, 4)
	testLRU("put(4, 4)", "nil", lRUCache)

	// 7. get(1)
	testLRU("get(1)", lRUCache.Get(1), lRUCache)

	// 8. get(3)
	testLRU("get(3)", lRUCache.Get(3), lRUCache)

	// 9. get(4)
	testLRU("get(4)", lRUCache.Get(4), lRUCache)
}
