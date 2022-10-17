// 278 第一个错误的版本278












class Solution:
    def findMin(self, nums: List[int]) -> int:
        left = 0;
        right = len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]


let left = 0;
let right = nums.length - 1;
while (left < right) {
  const mid = Math.floor((left+right)/2)
  if (nums[mid] > nums[right]){
    left = mid + 1
  } else {
    right = mid
  }
}
 return nums[left]