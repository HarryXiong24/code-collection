func nextGreaterElement(_ nums: [Int]) -> [Int] {
    var result = [Int](repeating: -1, count: nums.count)
    var monotonicStack = [Int]()
    
    for i in 0..<nums.count {
        while !monotonicStack.isEmpty && nums[i] > nums[monotonicStack.last!] {
            let index = monotonicStack.removeLast()
            result[index] = nums[i]
        }
        monotonicStack.append(i)
    }
    
    return result
}

// test
let nums = [2, 1, 2, 4, 3]
print(nextGreaterElement(nums)) // [4, 2, 4, -1, -1]
