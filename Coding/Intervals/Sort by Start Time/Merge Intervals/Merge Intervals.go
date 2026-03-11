package main

import (
	"fmt"
	"sort"
)

// DESCRIPTION (inspired by Leetcode.com)
// Write a function to consolidate overlapping intervals within a given array intervals, where each interval intervals[i] consists of a start time starti and an end time endi.

// Two intervals are considered overlapping if they share any common time, including if one ends exactly when another begins (e.g., [1,4] and [4,5] overlap and should be merged into [1,5]).

// The function should return an array of the merged intervals so that no two intervals overlap and all the intervals collectively cover all the time ranges in the original input.

// Input:
// intervals = [[3,5],[1,4],[7,9],[6,8]]

// Output:
// [[1,5],[6,9]]
// Explanation: The intervals [3,5] and [1,4] overlap and are merged into [1,5]. Similarly, [7,9] and [6,8] overlap and are merged into [6,9].

func mergeIntervals(intervals [][]int) [][]int {

	merged := make([][]int, 0)

	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	for _, interval := range intervals {
		if len(merged) == 0 || merged[len(merged)-1][1] < interval[0] {
			merged = append(merged, interval)
		} else {
			merged[len(merged)-1][1] = max(merged[len(merged)-1][1], interval[1])
		}
	}

	return merged
}

// test
func main() {
	intervals := [][]int{{3, 5}, {1, 4}, {7, 9}, {6, 8}}
	fmt.Println(mergeIntervals(intervals))
}
