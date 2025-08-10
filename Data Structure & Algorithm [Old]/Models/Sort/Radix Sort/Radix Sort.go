package main

import (
	"fmt"
	"math"
)

func customizedCountingSort(nums []int, digit int, count_volume int) {

	countArray := make([]int, count_volume)

	for _, item := range nums {
		index := (item / digit) % 10
		countArray[index] = countArray[index] + 1
	}

	sum := 0
	temp := 0
	for i := 0; i < len(countArray); i++ {
		sum = sum + temp
		temp = countArray[i]
		countArray[i] = sum
	}

	sortedArray := make([]int, len(nums))

	for i := 0; i < len(nums); i++ {
		currentDigit := (nums[i] / digit) % 10
		index := countArray[currentDigit]
		value := nums[i]
		sortedArray[index] = value
		countArray[currentDigit]++
	}

	for i := 0; i < len(nums); i++ {
		nums[i] = sortedArray[i]
	}
}

func radixSort(nums []int) []int {
	min := nums[0]
	mapper := 0
	for _, item := range nums {
		if min > item {
			min = item
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
	for _, item := range nums {
		if max < item {
			max = item
		}
	}
	digit := 1

	for digit <= max {
		customizedCountingSort(nums, digit, 10)
		digit = digit * 10
	}

	for i := 0; i < len(nums); i++ {
		nums[i] = nums[i] - mapper
	}

	return nums
}

// test
func main() {
	array := []int{831, 443, 256, -336, 736, -907, 3, 21323, 54}
	res := radixSort(array)
	fmt.Println(res)
}
