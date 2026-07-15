// 977. Squares of a Sorted Array

// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:
// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

// Example 2:
// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]

// Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?

func sortedSquares(_ nums: [Int]) -> [Int] {
    var left = 0
    var right = nums.count - 1
    var result = Array(repeating: 0, count: nums.count)
    var k = nums.count - 1

    while left <= right {
        if nums[left] * nums[left] <= nums[right] * nums[right] {
            result[k] = nums[right] * nums[right]
            k -= 1
            right -= 1
        } else {
            result[k] = nums[left] * nums[left]
            k -= 1
            left += 1
        }
    }

    return result
}

// test
let res = sortedSquares([-4, -1, 0, 3, 10])
print(res) // Output: [0, 1, 9, 16, 100]