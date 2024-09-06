// 1365. How Many Numbers Are Smaller Than the Current Number

// Given the array nums, for each nums[i] find out how many numbers in the array are smaller than it. That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].

// Return the answer in an array.

// Example 1:
// Input: nums = [8,1,2,2,3]
// Output: [4,0,1,1,3]
// Explanation: 
// For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
// For nums[1]=1 does not exist any smaller number than it.
// For nums[2]=2 there exist one smaller number than it (1). 
// For nums[3]=2 there exist one smaller number than it (1). 
// For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).

// Example 2:
// Input: nums = [6,5,4,8]
// Output: [2,1,0,3]

// Example 3:
// Input: nums = [7,7,7,7]
// Output: [0,0,0,0]

class Solution {
    func smallerNumbersThanCurrent(_ nums: [Int]) -> [Int] {
      var result: [Int] = Array(repeating: 0, count: nums.count)
      var map: [Int: Int] = [:]
      let nums_sort = nums.sorted()

      for i in stride(from: nums_sort.count - 1, through: 0, by: -1) {
        map[nums_sort[i]] = i
      }

      for i in 0..<nums.count {
        result[i] = map[nums[i]]!
      }

      return result
    }
}

// test
let solution = Solution()
let res = solution.smallerNumbersThanCurrent([8,1,2,2,3])
print(res)