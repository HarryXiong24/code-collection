package main

import (
	"fmt"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Given a list of intervals intervals and an interval newInterval, write a function to insert newInterval into a list of existing, non-overlapping, and sorted intervals based on their starting points. The function should ensure that after the new interval is added, the list remains sorted without any overlapping intervals, merging them if needed.

// Input:
// intervals = [[1,3],[6,9]]
// newInterval = [2,5]

// Output:
// [[1,5],[6,9]]
// Explanation: The new interval [2,5] overlaps with [1,3], so they are merged into [1,5].

// Time Complexity: O(n log n), because we are sorting the intervals
// Space Complexity: O(n), because we are creating a new array to store the merged intervals
func insertIntervals(intervals [][]int, newInterval []int) [][]int {

	if len(intervals) == 0 {
		return [][]int{newInterval}
	}

	merged := make([][]int, 0)

	intervals = append(intervals, newInterval)
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	for _, interval := range intervals {
		if len(merged) == 0 || interval[0] > merged[len(merged)-1][1] {
			merged = append(merged, interval)
		} else {
			merged[len(merged)-1][1] = max(interval[1], merged[len(merged)-1][1])
		}
	}

	return merged
}

// test
func main() {
	intervals := [][]int{{1, 3}, {6, 9}}
	newInterval := []int{2, 5}
	fmt.Println(insertIntervals(intervals, newInterval))
}
