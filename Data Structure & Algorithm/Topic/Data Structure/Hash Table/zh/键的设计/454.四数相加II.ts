// 454 四数相加 II

/**
 * 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n
 * 请你计算有多少个元组 (i, j, k, l) 能满足：
 * 0 <= i, j, k, l < n
 * nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 * 提示：
 * n == nums1.lengt
 * n == nums2.length
 * n == nums3.length
 * n == nums4.length
 * 1 <= n <= 200
 * -228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228
 */

/**
 * 思路:
 * 我们可以将四个数组分成两部分，A 和 B 为一组，C 和 D 为另外一组。
 * 对于 A 和 B，我们使用二重循环对它们进行遍历，得到所有 A[i]+B[j] 的值并存入哈希映射中。
 * 对于哈希映射中的每个键值对，每个键表示一种 A[i]+B[j]，对应的值为 A[i]+B[j] 出现的次数。
 * 对于 C 和 D，我们同样使用二重循环对它们进行遍历。
 * 当遍历到 C[k]+D[l] 时，如果 -(C[k]+D[l]) 出现在哈希映射中，那么将 -(C[k]+D[l]) 对应的值累加进答案中。
 * 最终即可得到满足 A[i]+B[j]+C[k]+D[l]=0 的四元组数目。
 */
export function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let count: number = 0;
  const map1_2: Map<number, number> = new Map<number, number>();
  // 构建 nums1 和 nums2 的集合
  for (let u of nums1) {
    for (let v of nums2) {
      map1_2.set(u + v, (map1_2.get(u + v) || 0) + 1);
    }
  }
  for (let u of nums3) {
    for (let v of nums4) {
      if (map1_2.has(-u - v)) {
        count += map1_2.get(-u - v)!;
      }
    }
  }
  return count;
}

// test
const res = fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]);
console.log(res);
