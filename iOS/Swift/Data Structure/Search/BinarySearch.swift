import Foundation

final class BinarySearch {

    // t: O(log(n)), s: O(1)
    static func solution<T: Comparable>(input: [T], target: T) -> Int? {

        var left = 0
        var right = input.count

        while left < right {
            let midIndex = (right + left) / 2
            let midNum = input[midIndex]

            if midNum == target {
                return midIndex
            } else if midNum < target {
                left = midIndex + 1
            } else {
                right = midIndex
            }
        }

        return nil
    }

}
