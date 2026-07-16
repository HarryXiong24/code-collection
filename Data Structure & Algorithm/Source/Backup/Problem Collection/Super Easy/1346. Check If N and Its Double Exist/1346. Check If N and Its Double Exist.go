// 1346. Check If N and Its Double Exist

// Given an array arr of integers, check if there exist two indices i and j such that :

// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

// Example 1:
// Input: arr = [10,2,5,3]
// Output: true
// Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

// Example 2:
// Input: arr = [3,1,7,11]
// Output: false
// Explanation: There is no i and j that satisfy the conditions.

package main

import "fmt"

func checkIfExist(arr []int) bool {
	m := make(map[int]int)

	for i, num := range arr {
		m[num*2] = i
	}

	for i, num := range arr {
		if j, ok := m[num]; ok && i != j {
			return true
		}
	}

	return false
}

// test
func main() {
	res := checkIfExist([]int{10, 2, 5, 3})
	fmt.Println(res)
}
