// 209. Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1

// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

func minSubArrayLen(_ target: Int, _ nums: [Int]) -> Int {
    var slow = 0
    var fast = 0
    var sum = 0
    var result = Int.max

    while fast < nums.count {
        sum += nums[fast]

        if sum >= target {
            while sum - nums[slow] >= target {
                sum -= nums[slow]
                slow += 1
            }
            
            result = min(result, fast - slow + 1)
        }

        fast += 1
    }

    return result == Int.max ? 0 : result
}

// test
let res = minSubArrayLen(7, [2, 3, 1, 2, 4, 3])
print(res) // Output: 2

