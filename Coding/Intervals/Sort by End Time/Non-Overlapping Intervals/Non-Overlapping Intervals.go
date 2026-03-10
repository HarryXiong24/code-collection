package main

import (
	"fmt"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to return the minimum number of intervals that must be removed from a given array intervals, where intervals[i] consists of a starting point start i and an ending point end i, to ensure that the remaining intervals do not overlap.

// Input:
// intervals = [[1,3],[5,8],[4,10],[11,13]]

// Output: 1
// Explanation: Removing the interval [4,10] leaves all other intervals non-overlapping.

// Time Complexity: O(n log n), because we are sorting the intervals
// Space Complexity: O(1)
func nonOverlappingIntervals(intervals [][]int) int {

	if len(intervals) == 0 {
		return 0
	}

	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][1] < intervals[j][1]
	})

	current := intervals[0][1]
	count := 1
	for i := 0; i < len(intervals)-1; i++ {
		if current <= intervals[i+1][0] {
			current = intervals[i+1][1]
			count++
		}
	}

	return len(intervals) - count
}

// test
func main() {
	intervals := [][]int{{1, 3}, {5, 8}, {4, 10}, {11, 13}}
	fmt.Println(nonOverlappingIntervals(intervals))
}
