
import Foundation

/*

 */

final class InsertionSort {

    // t: O(n^2), s: O(1)
    static func solution(array: [Int]) -> [Int] {
        if array.count < 2 { return array }
        var arr = array
        for i in 1..<arr.endIndex where arr[i-1] > arr[i] {
            var j = i
            while j > 0, arr[j] < arr[j-1] {
                arr.swapAt(j, j-1)
                j -= 1
            }
        }
        return arr
    }

}
