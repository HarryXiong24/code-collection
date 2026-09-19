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

// Question 1: What's your overall strategy for solving this problem? Why did you choose this approach over a brute-force one?
// Answer 1: Binary search reduces the time complexity compared to brute force, because instead of checking every rate one by one, it eliminates half of the remaining possibilities with each guess.

// Question 2: What's the time and space complexity of your solution, and why?
// Answer 2: The time complexity is O of N log of max apples, because for each of the O log of max apples binary search steps, we loop through all N trees to calculate the total hours. The space complexity is O of 1, because we don't use any extra data structures.

// Question 3: Why did you choose binary search here, and do you actually need the sort.Slice call at the top of your code?
// Answer 3: I don't actually need the sort. Instead, I need to calculate the maximum value in the apples array, because that maximum value is the upper bound for my binary search range.

// Question 4: What would your code do if the apples array contains a tree with zero apples on it? Walk me through it.
// Answer 4: If a tree has zero apples, we can just skip it, because it takes no time to harvest an empty tree.

// Question 5: Can you describe the code logic of the for loop in your binary search?
// Answer 5: In the binary search loop, I first calculate the middle value from left and right. Then I define a variable called actual hours to track the total hours needed at the current rate. I loop through each value in the apples array and divide it by the mid variable. If the remainder is zero, I use the quotient directly; if not, I add one, since Bobby needs a partial extra hour. Then I compare the total actual hours to h, and continue narrowing the search range based on that comparison.
