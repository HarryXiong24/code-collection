// We are given a set of n intervals, numbered 1 . . . n, each of which has a start time si and a finish time fi. For each interval, we want to compute a value p[i], which is the interval j with the latest finish time fj such that fj ≤ si; that is, the last-ending interval that finishes before interval i starts. If no intervals end before interval i begins, then p[i] = 0.
// Give an O(n log n) time algorithm that computes p[i] for all intervals. You may assume that the intervals are already sorted by finish time.

package main

import (
	"fmt"
)

type Interval struct {
	id         int
	start_time int
	end_time   int
}

func Search(intervals []Interval) []int {
	p := make([]int, len(intervals))

	for i := 0; i < len(intervals); i++ {
		left := 0
		right := len(intervals) - 1

		for left <= right {
			mid := left + (right-left)/2
			if intervals[mid].end_time <= intervals[i].start_time {
				p[i] = intervals[mid].id
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}

	return p
}

// test
func main() {
	intervals := []Interval{
		{id: 1, start_time: 1, end_time: 3},
		{id: 2, start_time: 2, end_time: 5},
		{id: 3, start_time: 4, end_time: 6},
		{id: 4, start_time: 7, end_time: 8},
		{id: 5, start_time: 9, end_time: 11},
	}

	result := Search(intervals)
	fmt.Println(result)
}
