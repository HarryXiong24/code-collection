package main

import "fmt"

func merge(left []int, right []int) []int {
	result := []int{}
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

func mergeSort(nums []int) []int {
	if len(nums) <= 1 {
		return nums
	}

	middle := len(nums) / 2
	left := nums[:middle]
	right := nums[middle:]

	return merge(mergeSort(left), mergeSort(right))
}

// test
func main() {
	nums := []int{10, 1, 3, 2, 9, 1, 5, 6}
	res := mergeSort(nums)
	fmt.Println(res)
}
