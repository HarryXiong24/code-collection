package main

import (
	"fmt"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to find the common free time for all employees from a list called schedule. Each employee's schedule is represented by a list of non-overlapping intervals sorted by start times. The function should return a list of finite, non-zero length intervals where all employees are free, also sorted in order.

// Input:
// schedule = [[[2,4],[7,10]],[[1,5]],[[6,9]]]

// Output:
// [(5,6)]

// Explanation: The three employees collectively have only one common free time interval, which is from 5 to 6.

// Time Complexity: O(n log n), because we are sorting the intervals
// Space Complexity: O(n), because we are creating a new array to store the merged intervals
func employeeFreeTime(schedule [][][]int) [][]int {

	scheduleSlot := make([][]int, 0)
	for _, employee := range schedule {
		scheduleSlot = append(scheduleSlot, employee...)
	}
	sort.Slice(scheduleSlot, func(i, j int) bool {
		return scheduleSlot[i][0] < scheduleSlot[j][0]
	})

	merged := make([][]int, 0)
	for _, interval := range scheduleSlot {
		if len(merged) == 0 || merged[len(merged)-1][1] < interval[0] {
			merged = append(merged, interval)
		} else {
			merged[len(merged)-1][1] = max(merged[len(merged)-1][1], interval[1])
		}
	}

	freeSlot := make([][]int, 0)
	for i := 0; i < len(merged)-1; i++ {
		if merged[i][1] < merged[i+1][0] {
			freeSlot = append(freeSlot, []int{merged[i][1], merged[i+1][0]})
		}
	}

	return freeSlot
}

// test
func main() {
	schedule := [][][]int{{{2, 4}, {7, 10}}, {{1, 5}}, {{6, 9}}}
	fmt.Println(employeeFreeTime(schedule))
}
