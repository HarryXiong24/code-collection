// 59. Spiral Matrix II

// Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

// Example 1:
// Input: n = 3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

// Example 2:
// Input: n = 1
// Output: [[1]]

class Solution {
    func generateMatrix(_ n: Int) -> [[Int]] {
      var start_x: Int = 0
      var start_y: Int = 0
      var offset: Int = 1
      var loop: Int = n / 2

      var result = Array(repeating: Array(repeating: 0, count: n), count: n)
      var count = 1

      while loop > 0 {

        for j in stride(from: start_y, to: n - offset, by: 1) {
          result[start_x][j] = count;
          count += 1
        }

        for i in stride(from: start_x, to: n - offset, by: 1) {
          result[i][n - offset] = count;
          count += 1
        }

        for j in stride(from: n - offset, to: start_y, by: -1) {
          result[n - offset][j] = count;
          count += 1
        }

        for i in stride(from: n - offset, to: start_x, by: -1) {
          result[i][start_y] = count;
          count += 1
        }


        start_x += 1
        start_y += 1
        offset += 1
        loop -= 1
      }

      if n % 2 == 1 {
        result[start_x][start_y] = count
      }

      return result
    }
}

// test
let solution = Solution()
let res = solution.generateMatrix(3);
print(res);
