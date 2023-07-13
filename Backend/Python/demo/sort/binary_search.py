def binarySearch(target, sortedLyst):
    """二分查找"""
    left = 0
    right = len(sortedLyst) - 1
    while left <= right:
      mid_index = (left + right) // 2
      if target == sortedLyst[mid_index]:
        return mid_index
      elif target < sortedLyst[mid_index]:
        right = mid_index - 1
      else:
        left = mid_index + 1
    return -1