// 599 两个列表的最小索引总和

/**
 * 假设Andy和Doris想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示。
 * 你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅。
 * 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设总是存在一个答案。
 * 示例 1:
 * 输入:
 * ["Shogun", "Tapioca Express", "Burger King", "KFC"]
 * ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
 * 输出: ["Shogun"]
 * 解释: 他们唯一共同喜爱的餐厅是“Shogun”。
 * 示例 2:
 * 输入:
 * ["Shogun", "Tapioca Express", "Burger King", "KFC"]
 * ["KFC", "Shogun", "Burger King"]
 * 输出: ["Shogun"]
 * 解释: 他们共同喜爱且具有最小索引和的餐厅是“Shogun”，它有最小的索引和1(0+1)。
 */

// 由于会出现多个相同的最小的索引和，而餐厅的名字是唯一的
// 所以设计的 map 必须以 string 为键，i+j 为值
export function findRestaurant(list1: string[], list2: string[]): string[] {
  const map: Map<string, number> = new Map<string, number>();

  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] === list2[j]) {
        map.set(list1[i], i + j);
      }
    }
  }

  let min = Number.MAX_VALUE;
  for (let i of map.values()) {
    if (i <= min) {
      min = i;
    }
  }

  const res = [];
  for (let [key, val] of map) {
    if (val === min) {
      res.push(key);
    }
  }

  return res;
}

// test
const res1 = findRestaurant(
  ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
  ['Piatti', 'The Grill at Torrey Pines', 'Hungry Hunter Steakhouse', 'Shogun']
);
const res2 = findRestaurant(
  ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
  ['KFC', 'Shogun', 'Burger King']
);
console.log(res1);
console.log(res2);
