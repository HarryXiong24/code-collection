import Foundation

func heapify(_ nums: inout [Int], _ length: Int, _ currentIndex: Int) {
    var maxIndex = currentIndex
    let leftIndex = 2 * currentIndex + 1
    let rightIndex = 2 * currentIndex + 2

    if leftIndex < length && nums[leftIndex] > nums[maxIndex] {
        maxIndex = leftIndex
    }
    if rightIndex < length && nums[rightIndex] > nums[maxIndex] {
        maxIndex = rightIndex
    }

    if currentIndex != maxIndex {
        nums.swapAt(currentIndex, maxIndex)
        heapify(&nums, length, maxIndex)
    }
}

func heapSort(_ nums: inout [Int]) {
    let length = nums.count

    for i in stride(from: length / 2 - 1, through: 0, by: -1) {
        heapify(&nums, length, i)
    }

    for i in stride(from: length - 1, through: 0, by: -1) {
        nums.swapAt(0, i)
        heapify(&nums, i, 0)
    }
}

// test
var array = [2, 0, 2, 1, 1, 0, -3, -4]
heapSort(&array)
print(array)