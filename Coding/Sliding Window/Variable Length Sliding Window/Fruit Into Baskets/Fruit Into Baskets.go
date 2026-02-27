package main

import "fmt"

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to calculate the maximum number of fruits you can collect from an integer array fruits, where each element represents a type of fruit. You can start collecting fruits from any position in the array, but you must stop once you encounter a third distinct type of fruit. The goal is to find the longest subarray where at most two different types of fruits are collected.
// Example:
// Input: fruits = [3, 3, 2, 1, 2, 1, 0]
// Output: 4
// Explanation: We can pick up 4 fruit from the subarray [2, 1, 2, 1]

// Time Complexity: O(n)
// Space Complexity: O(1), since the map never contains more than 3 keys.
func fruitIntoBaskets(fruits []int) int {
	maxLength := 0
	dict := make(map[int]int)

	start := 0
	for end := 0; end < len(fruits); end++ {
		dict[fruits[end]]++

		if len(dict) <= 2 {
			maxLength = max(maxLength, end-start+1)
		} else {
			dict[fruits[start]]--
			if dict[fruits[start]] == 0 {
				delete(dict, fruits[start])
			}
			start++
		}
	}

	return maxLength
}

// test
func main() {
	nums := []int{3, 3, 2, 1, 2, 1, 0}
	fmt.Println(fruitIntoBaskets(nums))
}
