package main

import (
	"fmt"
	"math"
	"sort"
)

func bucketSort(nums []int, bucket_number int) []int {
	min := nums[0]
	mapper := 0

	for i := 0; i < len(nums); i++ {
		if min > nums[i] {
			min = nums[i]
		}
	}

	if min < 0 {
		mapper = int(math.Abs(float64(0 - min)))
	} else {
		mapper = 0
	}

	for i := 0; i < len(nums); i++ {
		nums[i] = nums[i] + mapper
	}

	max := nums[0]
	for i := 0; i < len(nums); i++ {
		if max < nums[i] {
			max = nums[i]
		}
	}
	buckets := make([][]int, bucket_number)
	bucketSize := (max - min) / bucket_number

	for i := 0; i < len(nums); i++ {
		index := (nums[i] - min) / bucketSize
		if index >= bucket_number {
			buckets[bucket_number-1] = append(buckets[bucket_number-1], nums[i])
		} else {
			buckets[index] = append(buckets[index], nums[i])
		}
	}

	for _, bucket := range buckets {
		sort.Ints(bucket)
	}

	sortArray := []int{}

	for _, row := range buckets {
		for _, num := range row {
			sortArray = append(sortArray, num)
		}
	}

	for i := 0; i < len(sortArray); i++ {
		sortArray[i] = sortArray[i] - mapper
	}

	return sortArray

}

// test
func main() {
	array := []int{23, 25, 21, -12, 19, 17, -5, 7}
	res := bucketSort(array, 5)
	fmt.Println(res)
}
