package main

import (
	"errors"
	"fmt"
	"hash/fnv"
)

type KVNode struct {
	key   interface{}
	value interface{}
}

func NewKVNode(key interface{}, value interface{}) *KVNode {
	return &KVNode{
		key:   key,
		value: value,
	}
}

type ChainingHashMap struct {
	table [][]*KVNode
	size  int
}

func NewChainingHashMap(initCapacity int) *ChainingHashMap {

	if initCapacity < 1 {
		initCapacity = 1
	}

	return &ChainingHashMap{
		table: make([][]*KVNode, initCapacity),
		size:  0,
	}
}

// add / update
func (hashMap *ChainingHashMap) Put(key interface{}, value interface{}) error {
	if key == nil {
		return errors.New("key is null")
	}

	list := hashMap.table[hashMap.hash(key)]

	for _, node := range list {
		if node.key == key {
			node.value = value
			return nil
		}
	}

	list = append(list, NewKVNode(key, value))
	hashMap.table[hashMap.hash(key)] = list
	hashMap.size++

	if float64(hashMap.size) >= float64(len(hashMap.table))*0.75 {
		hashMap.resize(len(hashMap.table) * 2)
	}

	return nil
}

// remove
func (hashMap *ChainingHashMap) Remove(key interface{}) error {
	if key == nil {
		return errors.New("key is null")
	}

	list := hashMap.table[hashMap.hash(key)]

	for i, node := range list {
		if node.key == key {
			list = append(list[:i], list[i+1:]...)
			hashMap.table[hashMap.hash(key)] = list
			hashMap.size--
		}
	}

	// 缩容，当负载因子小于 0.125 时，缩容
	if hashMap.size <= len(hashMap.table)/8 {
		hashMap.resize(len(hashMap.table) / 4)
	}

	return nil
}

// get
func (hashMap *ChainingHashMap) Get(key interface{}) (interface{}, error) {
	if key == nil {
		return nil, errors.New("key is null")
	}

	list := hashMap.table[hashMap.hash(key)]

	for _, node := range list {
		if node.key == key {
			return node.value, nil
		}
	}

	return nil, nil
}

// keys()
func (hashMap *ChainingHashMap) Keys() []interface{} {
	keys := make([]interface{}, 0)
	for _, item := range hashMap.table {
		for _, node := range item {
			keys = append(keys, node.key)
		}
	}
	return keys
}

// values()
func (hashMap *ChainingHashMap) Values() []interface{} {
	values := make([]interface{}, 0)
	for _, item := range hashMap.table {
		for _, node := range item {
			values = append(values, node.value)
		}
	}
	return values
}

// get size
func (hashMap *ChainingHashMap) GetSize() int {
	return hashMap.size
}

func (hashMap *ChainingHashMap) resize(newCap int) {
	if newCap < 1 {
		newCap = 1
	}

	newMap := NewChainingHashMap(newCap)

	for _, item := range hashMap.table {
		for _, node := range item {
			newMap.Put(node.key, node.value)
		}
	}

	hashMap.table = newMap.table
}

func (hashMap *ChainingHashMap) hash(key interface{}) int {
	switch v := key.(type) {
	case fmt.Stringer:
		return hashMap.hashString(v.String())
	case string:
		return hashMap.hashString(v)
	default:
		return hashMap.hashString(fmt.Sprintf("%v", v))
	}
}

// hashString 使用 FNV-1a 哈希算法计算字符串的哈希值
func (hashMap *ChainingHashMap) hashString(s string) int {
	h := fnv.New32a()
	h.Write([]byte(s))
	return int(h.Sum32()) % len(hashMap.table)
}

// test
func main() {
	mapInstance := NewChainingHashMap(4)
	mapInstance.Put(1, 1)
	mapInstance.Put(2, 2)
	mapInstance.Put(3, 3)

	fmt.Println(mapInstance.Get(1)) // 1
	fmt.Println(mapInstance.Get(2)) // 2

	mapInstance.Put(1, 100)
	fmt.Println(mapInstance.Get(1)) // 100

	mapInstance.Remove(2)
	fmt.Println(mapInstance.Get(2))   // nil
	fmt.Println(mapInstance.Keys())   // [1, 3] (order may vary)
	fmt.Println(mapInstance.Values()) // [100, 3] (order may vary)

	mapInstance.Remove(1)
	mapInstance.Remove(2)
	mapInstance.Remove(3)
	fmt.Println(mapInstance.Get(1)) // nil
}
