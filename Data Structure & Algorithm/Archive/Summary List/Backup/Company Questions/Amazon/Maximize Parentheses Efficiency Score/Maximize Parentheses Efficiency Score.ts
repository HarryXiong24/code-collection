// Maximize Parentheses Efficiency Score

// At Amazon, a user owns a unique tool called the "Parentheses Perfection Kit." This kit contains different types of parentheses, each with a specific efficiency rating. The goal is to create a balanced sequence of parentheses by adding zero or more parentheses from the kit to maximize the sequence's total EfficiencyScore. The EfficiencyScore of a sequence is the sum of the efficiency ratings of the parentheses used from the kit.

// A sequence is considered balanced if it has an equal number of opening ( and closing ) parentheses, with each opening parenthesis properly matched with a closing one in the correct order (i.e., circular balance). For instance, sequences like (), (()), and (()()) are balanced, while sequences like ), ()(, and ())(  are not.

// You are given an initial parentheses sequence represented by the string s, along with a Parentheses Perfection Kit containing different types of parentheses in the form of the string kitParentheses and their respective efficiency ratings in the efficiencyRatings array (both of size m). The EfficiencyScore of the original string s is initially 0. You can use any number of unused parentheses from the kit to create the final sequence, as long as the final sequence remains balanced.

// The task is to determine the maximum possible EfficiencyScore that can be achieved for the resulting balanced sequence.

// It is guaranteed that the sequence can be made balanced by adding zero or more parentheses from the kit.

// Function Description

// Complete the function maximizeEfficiencyScore in the editor.

// maximizeEfficiencyScore has the following parameters:

// 1. String s: the initial parentheses sequence
// 2. String kitParentheses: the parentheses available in the kit
// 3. int[] efficiencyRatings: the efficiency ratings of the parentheses in the kit
// Returns

// int: the maximum possible EfficiencyScore

// Example 1:
// Input:  s = ")((", kitParentheses = ")(()))", efficiencyRatings = [3, 4, 2, -4, -1, -3]
// Output: 6

export function maximizeEfficiencyScore(s: string, kitParentheses: string, efficiencyRatings: number[]): number {
  const map: Map<string, number[]> = new Map();

  for (let i = 0; i < kitParentheses.length; i++) {
    if (!map.has(kitParentheses[i])) {
      map.set(kitParentheses[i], []);
    }
    map.get(kitParentheses[i])!.push(efficiencyRatings[i]);
  }

  for (const item of map.values()) {
    item.sort((a, b) => b - a);
  }

  const stack: string[] = [];
  let maximizeEfficiencyScore: number = 0;

  for (const item of s) {
    if (item === '(') {
      stack.push(item);
    } else {
      if (stack.length) {
        stack.pop();
      } else {
        maximizeEfficiencyScore += map.get('(')!.shift() || 0;
      }
    }
  }

  for (let i = 0; i < stack.length; i++) {
    maximizeEfficiencyScore += map.get(')')!.shift() || 0;
  }

  return maximizeEfficiencyScore;
}

// test
const res = maximizeEfficiencyScore(')((', ')(()))', [3, 4, 2, -4, -1, -3]);
console.log(res);
