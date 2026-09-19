package main

import (
	"sort"
)

// DESCRIPTION
// Bobby has an orchard of apple trees, and each tree has a certain number of apples on it.

// Bobby wants to collect all the apples by the end of the day by collecting a fixed number of apples per hour. He can only harvest apples from one tree per hour - if he finishes collecting apples from a tree before the hour is up, he must wait until the next hour to move to the next tree.

// For example, if there are 3 apples on a tree and Bobby collects 1 apple per hour, it will take him 3 hours to finish collecting the apples on that tree.
// If he harvests 2 apples per hour, it will take him 2 hours to finish collecting all the apples on that tree (he waits until the hour is up even though he finishes early).
// Write a function to determine the slowest rate of apples Bobby can harvest per hour to finish the job in at most 'h' hours. The input to the function is an array of integers representing the number of apples on each tree and an integer 'h' representing the number of hours Bobby has to finish the job within.

// Example 1:

// Input:

// apples = [3, 6, 7], h = 8
// Output: 3

// Explanation:

// 1 apple per hour: 3 hours for first tree, 6 hours the second tree, and 7 hours for third tree. This totals 16 hours, which is more than the 8 hours he has to finish the job. NOT VALID.
// 2 apples per hour: 2 + 3 + 4 = 9 hours, which is more than the 8 hours he has to finish the job. NOT VALID.
// 3 apples per hour: 1 + 2 + 3 = 6 hours, which is less than the 8 hours he has to finish the job. VALID.
// 4 apples per hour: 1 + 2 + 2 = 5 hours, which is less than the 8 hours he has to finish the job. VALID.
// 5 apples per hour: 1 + 2 + 2 = 5 hours, which is less than the 8 hours he has to finish the job. VALID.
// Therefore, the minimum number of apples Bobby must harvest per hour to finish the job in 8 hours or less is 3.

// Example 2:

// Input:

// apples = [25, 9, 23, 8, 3], h = 5
// Output: 25 (Bobby must harvest 25 apples per hour to finish in 5 hours or less)

func minHarvestRate(apples []int, h int) int {
	// Your code goes here
	sort.Slice(apples, func(i, j int) bool {
		return apples[i] < apples[j]
	})

	left := 1
	right := apples[len(apples)-1]
	res := right

	for left <= right {
		mid := (left + right) / 2
		actualHours := 0
		for _, value := range apples {
			if value%mid == 0 {
				actualHours += value / mid
			} else {
				actualHours += value/mid + 1
			}
		}

		if actualHours > h {
			left = mid + 1
		} else {
			res = min(res, mid)
			right = mid - 1
		}
	}

	return res
}

func main() {
	// Test cases
	result1 := minHarvestRate([]int{3, 6, 7}, 8)
	println("Test Case 1: Expected: 3, Got:", result1)
	result2 := minHarvestRate([]int{25, 9, 23, 8, 3}, 5)
	println("Test Case 2: Expected: 25, Got:", result2)
}
