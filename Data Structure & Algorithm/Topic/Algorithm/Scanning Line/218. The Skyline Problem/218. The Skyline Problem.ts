// 218. The Skyline Problem

// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.

// The geometric information of each building is given in the array buildings where buildings[i] = [lefti, righti, heighti]:

// lefti is the x coordinate of the left edge of the ith building.
// righti is the x coordinate of the right edge of the ith building.
// heighti is the height of the ith building.
// You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

// The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form [[x1,y1],[x2,y2],...]. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate 0 and is used to mark the skyline's termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.

// Note: There must be no consecutive horizontal lines of equal height in the output skyline. For instance, [...,[2 3],[4 5],[7 5],[11 5],[12 7],...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...,[2 3],[4 5],[12 7],...]

// Example 1:
// Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
// Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
// Explanation:
// Figure A shows the buildings of the input.
// Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.

// Example 2:
// Input: buildings = [[0,2,3],[2,5,3]]
// Output: [[0,3],[5,0]]

class MaxHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  push(value: number) {
    this.heap.push(value);
    this.heap.sort((a, b) => b - a);
  }

  remove(value: number) {
    const index = this.heap.indexOf(value);
    if (index !== -1) {
      this.heap.splice(index, 1);
    }
  }

  peek() {
    return this.heap[0];
  }
}

export function getSkyline(buildings: number[][]) {
  const events: [number, number][] = [];

  for (const [left, right, height] of buildings) {
    events.push([left, -height]); // 开始事件
    events.push([right, height]); // 结束事件
  }

  events.sort((a, b) => {
    // 按 x 坐标排序，如果 x 坐标相同，则按高度排序
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1]; // 先处理加入（负数），再处理删除（正数）
  });

  const result = [];
  const maxHeap = new MaxHeap();
  maxHeap.push(0); // 初始高度为 0
  let prevHeight = 0; // 前一个高度

  for (const [x, h] of events) {
    if (h < 0) {
      maxHeap.push(-h); // 添加高度
    } else {
      maxHeap.remove(h); // 移除高度
    }

    const currHeight = maxHeap.peek();
    // 如果当前高度不等于前一个高度，则添加到结果中
    // 理由：如果当前高度等于前一个高度，则说明当前高度没有变化，不需要添加到结果中
    if (currHeight !== prevHeight) {
      result.push([x, currHeight]);
      prevHeight = currHeight;
    }
  }

  return result;
}

// test
const res = getSkyline([
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
]);
console.log(res); //  [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
