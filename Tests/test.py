def count_inversions(arr):
    def merge_and_count(left, right):
        i, j = 0, 0
        merged = []
        count = 0

        # 合并两部分并统计反序对
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                # 统计反序对：左部分的剩余元素都与右部分当前元素构成反序对
                count += len(left) - i
                j += 1

        # 将剩余部分添加到合并后的数组中
        merged.extend(left[i:])
        merged.extend(right[j:])
        print(merged, count)
        return merged, count

    def divide_and_count(arr):
        if len(arr) <= 1:
            return arr, 0

        mid = len(arr) // 2
        left, left_count = divide_and_count(arr[:mid])
        right, right_count = divide_and_count(arr[mid:])
        merged, merge_count = merge_and_count(left, right)

        # 总反序对数量
        return merged, left_count + right_count + merge_count

    pairs, total_count = divide_and_count(arr)
    return pairs, total_count


# test
pairs, res = count_inversions([3, 2, 1, 4, 5, 2, 1])
print(pairs, res)
