// 134. Gas Station

// There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

// Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique

// Example 1:
// Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// Output: 3
// Explanation:
// Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 4. Your tank = 4 - 1 + 5 = 8
// Travel to station 0. Your tank = 8 - 2 + 1 = 7
// Travel to station 1. Your tank = 7 - 3 + 2 = 6
// Travel to station 2. Your tank = 6 - 4 + 3 = 5
// Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
// Therefore, return 3 as the starting index.

// Example 2:
// Input: gas = [2,3,4], cost = [3,4,3]
// Output: -1
// Explanation:
// You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
// Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
// Travel to station 0. Your tank = 4 - 3 + 2 = 3
// Travel to station 1. Your tank = 3 - 3 + 3 = 3
// You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
// Therefore, you can't travel around the circuit once no matter where you start.

// T: O(n)
// S: O(1)
export function canCompleteCircuit_better(gas: number[], cost: number[]): number {
  let total_gas: number = 0;
  let ans = 0;
  let rest: number = 0;

  for (let i = 0; i < gas.length; i++) {
    total_gas = total_gas + (gas[i] - cost[i]);
    rest = rest + (gas[i] - cost[i]);

    if (rest < 0) {
      rest = 0;
      ans = i + 1;
    }
  }

  if (total_gas >= 0) {
    return ans;
  } else {
    return -1;
  }
}

// Time Limit
export function canCompleteCircuit(gas: number[], cost: number[]): number {
  const station_count = gas.length;

  const go = (start: number): boolean => {
    const rest_gas: number[] = [];

    // init
    rest_gas.push(gas[start]);

    while (rest_gas.length < station_count) {
      const current_cost = rest_gas[rest_gas.length - 1] - cost[start];
      if (current_cost <= 0) {
        return false;
      }
      start = (start + 1) % station_count;
      rest_gas.push(current_cost + gas[start]);
    }

    const last_cost = rest_gas[rest_gas.length - 1] - cost[start];
    if (last_cost < 0) {
      return false;
    }

    return true;
  };

  let flag = false;
  for (let i = 0; i < gas.length; i++) {
    flag = go(i);
    if (flag === true) {
      return i;
    }
  }
  return -1;
}

// test
const gas = [1, 2, 3, 4, 5]; // [-2 -2 -2 3 3]
const cost = [3, 4, 5, 1, 2];
const res = canCompleteCircuit(gas, cost);
const res_better = canCompleteCircuit_better(gas, cost);
console.log(res);
console.log(res_better);

const gas1 = [2, 3, 4]; // [-1 -1 1]
const cost1 = [3, 4, 3];
const res1 = canCompleteCircuit(gas1, cost1);
const res_better1 = canCompleteCircuit_better(gas, cost);
console.log(res1);
console.log(res_better1);

const gas2 = [4, 5, 3, 1, 4]; // [-1 1 0 -3 2]
const cost2 = [5, 4, 3, 4, 2];
const res2 = canCompleteCircuit(gas2, cost2);
const res_better2 = canCompleteCircuit_better(gas, cost);
console.log(res2);
console.log(res_better2);
