package main

// DESCRIPTION (inspired by Leetcode.com)
// You are given a sorted array that has been rotated at an unknown pivot point, along with a target value. Develop an algorithm to locate the index of the target value in the array. If the target is not present, return -1. The algorithm should have a time complexity of O(log n).

// Note:
// The array was originally sorted in ascending order before being rotated.
// The rotation could be at any index, including 0 (no rotation).
// You may assume there are no duplicate elements in the array.
// Example 1:
// Input:

// nums = [4,5,6,7,0,1,2], target = 0
// Output: 4 (The index of 0 in the array)

// Example 2:

// Input:

// nums = [4,5,6,7,0,1,2], target = 3
// Output: -1 (3 is not in the array)

func search(nums []int, target int) int {
	// Your code goes here
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2

		if nums[mid] == target {
			return mid
		}

		if nums[left] <= nums[mid] {
			if nums[left] <= target && target <= nums[mid] {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if nums[mid] < target && target <= nums[right] {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}

	return -1
}

func main() {
	// Example usage
	nums := []int{4, 5, 6, 7, 0, 1, 2}
	target := 0
	result := search(nums, target)
	println(result) // Output: 4

	target = 3
	result = search(nums, target)
	println(result) // Output: -1
}

// Question 1: What's your overall strategy here? Why does binary search still work here, even though the array's been rotated instead of being purely sorted?
// Answer 1: I'm using binary search because we need log n time. The array's rotated, so it's not fully sorted, but here's the key insight: if you pick the middle point, one side of it is always properly sorted, and the other side has the rotation in it. So each time through the loop, I check which side is sorted, then check whether the target falls within that sorted range. If it does, I search there. If not, I search the other side.

// Question 2: In the else branch, when the right side is the sorted one, why do you compare the target against nums at mid and nums at right instead of nums at left and nums at mid?
// Answer 2: In the else branch, we know the left side isn't sorted, which means the right side must be. So now I check if the target is between mid and right. If it is, the target's in that sorted right half, so I move left to mid plus one and search there. If it's not in that range, the target must be in the left half instead, so I move right down to mid minus one.

// Question 3: What's the time and space complexity of your solution, and why?
// Answer 3: Time complexity is O of log n because binary search cuts the search space in half every iteration. Space complexity is O of one because I'm not using any extra data structures, just a few pointers.

// Question 4: How does your code handle the case where there's no rotation at all, meaning the array is fully sorted?
// Answer 4: If there's no rotation, the array is fully sorted, so nums at left will always be less than or equal to nums at mid, and we'll always go into the if branch, never the else. At that point it just behaves like a normal binary search: if the target's between left and mid, search the left half, otherwise search the right half.
