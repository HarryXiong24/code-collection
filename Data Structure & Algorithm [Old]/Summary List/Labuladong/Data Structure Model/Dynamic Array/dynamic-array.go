package main

import (
	"errors"
	"fmt"
)

const INIT_CAP = 1

type DynamicArray struct {
	data []interface{}
	size int
}

func NewDynamicArray(initCapacity int) *DynamicArray {
	return &DynamicArray{
		data: make([]interface{}, initCapacity),
		size: 0,
	}
}

func (arr *DynamicArray) GetSize() int {
	return arr.size
}

func (arr *DynamicArray) GetCapacity() int {
	return len(arr.data)
}

func (arr *DynamicArray) IsEmpty() bool {
	return arr.size == 0
}

func (arr *DynamicArray) Get(index int) (interface{}, error) {

	if index < 0 || index >= len(arr.data) {
		return nil, errors.New("index overflow")
	}

	return arr.data[index], nil
}

func (arr *DynamicArray) Set(index int, value interface{}) error {

	if index < 0 || index >= len(arr.data) {
		return errors.New("index overflow")
	}

	arr.data[index] = value

	return nil
}

func (arr *DynamicArray) Print() []interface{} {
	result := make([]interface{}, arr.size)

	for i := 0; i < arr.size; i++ {
		result[i] = arr.data[i]
	}

	return result
}

func (arr *DynamicArray) Add(index int, value interface{}) error {

	if index < 0 || index > len(arr.data) {
		return errors.New("index overflow")
	}

	cap := len(arr.data)
	if arr.size == cap {
		arr.Resize(2 * cap)
	}

	for i := arr.size - 1; i >= index; i-- {
		arr.data[i+1] = arr.data[i]
	}
	arr.data[index] = value
	arr.size++

	return nil
}

func (arr *DynamicArray) Push(value interface{}) error {
	err := arr.Add(arr.size, value)
	return err
}

func (arr *DynamicArray) Unshift(value interface{}) error {
	err := arr.Add(0, value)
	return err
}

func (arr *DynamicArray) Remove(index int) (interface{}, error) {

	if index < 0 || index >= len(arr.data) {
		return nil, errors.New("index overflow")
	}

	deleteValue := arr.data[index]

	for i := index + 1; i < arr.size; i++ {
		arr.data[i-1] = arr.data[i]
	}

	arr.data[arr.size-1] = nil
	arr.size--

	cap := len(arr.data)
	if arr.size <= cap/4 {
		arr.Resize(cap / 2)
	}

	return deleteValue, nil
}

func (arr *DynamicArray) Pop() (interface{}, error) {
	deleteValue, err := arr.Remove(arr.size - 1)
	return deleteValue, err
}

func (arr *DynamicArray) Shift() (interface{}, error) {
	deleteValue, err := arr.Remove(0)
	return deleteValue, err
}

// utils
func (arr *DynamicArray) Resize(newCap int) {

	newArr := make([]interface{}, newCap)

	for i := 0; i < arr.size; i++ {
		newArr[i] = arr.data[i]
	}

	arr.data = newArr
}

// test
func main() {
	// 创建一个容量为 3 的数组
	arr := NewDynamicArray(3)
	fmt.Println(arr.Print())       // []
	fmt.Println(arr.GetCapacity()) // 3

	// 添加 5 个元素
	for i := 1; i <= 5; i++ {
		arr.Push(i)
	}
	fmt.Println(arr.Print())       // [1, 2, 3, 4, 5]
	fmt.Println(arr.GetCapacity()) // 6

	// 删除第 3 个元素
	arr.Remove(3)
	fmt.Println(arr.Print())       // [1, 2, 3, 5]
	fmt.Println(arr.GetCapacity()) // 6

	// 在索引 1 插入 9
	arr.Add(1, 9)
	fmt.Println(arr.Print())       // [1, 9, 2, 3, 5]
	fmt.Println(arr.GetCapacity()) // 6

	// 在数组开头插入 100
	arr.Unshift(100)
	fmt.Println(arr.Print())       // [100, 1, 9, 2, 3, 5]
	fmt.Println(arr.GetCapacity()) // 6

	// 移除并返回数组末尾的元素
	val, _ := arr.Pop()
	fmt.Println(val, arr.Print())  // 5 [100, 1, 9, 2, 3]
	fmt.Println(arr.GetCapacity()) // 6

	// 移除并返回数组开头的元素
	val2, _ := arr.Shift()
	fmt.Println(val2, arr.Print()) // 100 [1, 9, 2, 3]
	fmt.Println(arr.GetCapacity()) // 6

	// 连续移除开头的元素
	val3, _ := arr.Shift()
	fmt.Println(val3, arr.Print()) // 1 [9, 2, 3]
	fmt.Println(arr.GetCapacity()) // 6

	val4, _ := arr.Shift()
	fmt.Println(val4, arr.Print()) // 9 [2, 3]
	fmt.Println(arr.GetCapacity()) // 6

	val5, _ := arr.Shift()
	fmt.Println(val5, arr.Print()) // 2 [3]
	fmt.Println(arr.GetCapacity()) // 3

	val6, _ := arr.Shift()
	fmt.Println(val6, arr.Print()) // 3 []
	fmt.Println(arr.GetCapacity()) // 1
}
