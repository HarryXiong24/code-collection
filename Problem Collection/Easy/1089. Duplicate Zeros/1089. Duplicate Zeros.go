// 1089. Duplicate Zeros

// Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

// Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

// Example 1:
// Input: arr = [1,0,2,3,0,4,5,0]
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

// Example 2:
// Input: arr = [1,2,3]
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]

package main

import "fmt"

func duplicateZeros(arr []int) {
	count := 0
	flag := 0
	copyFrom := 0

	for i := 0; i < len(arr); i++ {
		if count >= len(arr) {
			break
		}
		if arr[i] == 0 {
			count += 2
		} else {
			count++
		}
		copyFrom = i
	}

	copyTo := len(arr) - 1
	if count > len(arr) {
		flag = 1
	}

	for copyTo >= 0 {
		if arr[copyFrom] == 0 && flag == 0 {
			arr[copyTo] = arr[copyFrom]
			arr[copyTo-1] = 0
			copyTo -= 2
		} else if arr[copyFrom] == 0 && flag == 1 {
			arr[copyTo] = arr[copyFrom]
			flag = 0
			copyTo--
		} else {
			arr[copyTo] = arr[copyFrom]
			copyTo--
		}
		copyFrom--
	}
}

// test
func main() {
	arr := []int{1, 0, 2, 3, 0, 4, 5, 0}
	duplicateZeros(arr)
	fmt.Println(arr)
}
