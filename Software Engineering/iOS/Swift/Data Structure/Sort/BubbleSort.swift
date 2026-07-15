import Foundation

/*
 
 */

final class BubbleSort {

    // t: O(n^2), s: O(1)
    static func solution(array: [Int]) -> [Int] {
        var array = array
        for index in array.indices {
            let endIndex = array.endIndex - index // Each round will move largest to the end
            for j in 1..<endIndex where array[j-1] > array[j] {
                array.swapAt(j, j-1)
            }
        }
        return array
    }

}
