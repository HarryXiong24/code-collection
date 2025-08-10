package main

import "fmt"

type Interval struct {
	id         int
	start_time int
	end_time   int
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
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

func main() {
	intervals := []Interval{
		{id: 0, start_time: 1, end_time: 3},
		{id: 1, start_time: 2, end_time: 5},
		{id: 2, start_time: 4, end_time: 6},
		{id: 3, start_time: 7, end_time: 8},
		{id: 4, start_time: 9, end_time: 11},
	}
	v := []int{2, 3, 4, 7, 2}
	p := Search(intervals)

	var WIS func(i int) int
	WIS = func(i int) int {
		if i < 0 {
			return 0
		}

		if i == 0 {
			return v[i]
		}

		valueIfNotTaken := WIS(i - 1)
		valueIfTaken := v[i] + WIS(p[i])

		return max(valueIfNotTaken, valueIfTaken)
	}

	res := WIS(len(intervals) - 1)

	fmt.Println(res)

	// Dynamic Programming
	WISDP := make([]int, len(intervals))
	WISDP[0] = v[0]

	for i := 1; i < len(intervals); i++ {
		WISDP[i] = max(WISDP[i-1], v[i]+WISDP[p[i]])
	}

	fmt.Println(WISDP[len(intervals)-1])
}
