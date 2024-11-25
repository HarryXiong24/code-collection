// Award Budget Cuts

// The awards committee of your alma mater (i.e. your college/university) asked for your assistance with a budget allocation problem they’re facing. Originally, the committee planned to give N research grants this year. However, due to spending cutbacks, the budget was reduced to newBudget dollars and now they need to reallocate the grants. The committee made a decision that they’d like to impact as few grant recipients as possible by applying a maximum cap on all grants. Every grant initially planned to be higher than cap will now be exactly cap dollars. Grants less or equal to cap, obviously, won’t be impacted.

// Given an array grantsArray of the original grants and the reduced budget newBudget, write a function findGrantsCap that finds in the most efficient manner a cap such that the least number of recipients is impacted and that the new budget constraint is met (i.e. sum of the N reallocated grants equals to newBudget).

// Analyze the time and space complexities of your solution.

// Example:

// input:  grantsArray = [2, 100, 50, 120, 1000], newBudget = 190

// output: 47 # and given this cap the new grants array would be
//            # [2, 47, 47, 47, 47]. Notice that the sum of the
//            # new grants is indeed 190

export function findGrantsCap1(grantsArray, newBudget) {
  // firstly I think we need to sort this array to handle the budget better.
  // Start by sorting the array, so we can deal with smaller grants first.
  grantsArray.sort((a, b) => a - b);

  // variable remaining means the first round we have the budget that we can use
  // 'remaining' keeps track of how much budget we have left to allocate.
  let remaining = newBudget;

  // and variable avg means for per element, the cap it can be allocated
  // 'avg' is the current average cap that we can allocate per grant.
  let avg = remaining / grantsArray.length;

  for (let i = 0; i < grantsArray.length; i++) {
    // this is used to avoid dividing by 0, and we can return avg directly
    // If this is the last grant left to process, we can directly return the current average cap.
    if (grantsArray.length - i - 1 === 0) {
      return avg;
    }

    if (grantsArray[i] < avg) {
      // if grantsArray[i] < avg, means this element value is less than avg, so we can update the next round remaining and avg
      remaining = remaining - grantsArray[i];
      avg = remaining / (grantsArray.length - i - 1);
    } else {
      // if grantsArray[i] >= avg, because the remaining elements are more than this element, we know that now is the best cap, so return it.
      // this cap works for all remaining grants, so return it as the final cap.
      return avg;
    }
  }
  return avg;
}

export function findGrantsCap2(grantsArray, newBudget) {
  // your code goes here

  grantsArray.sort((a, b) => a - b);

  let prefixSum = 0;

  for (let i = 0; i < grantsArray.length; i++) {
    const remainBudget = newBudget - prefixSum;
    const remainCount = grantsArray.length - i;

    const cap = remainBudget / remainCount;

    if (cap <= grantsArray[i]) {
      return cap;
    }

    prefixSum = prefixSum + grantsArray[i];
  }

  return grantsArray[grantsArray.length - 1];
}

// test
const res = findGrantsCap1([2, 100, 50, 120, 1000], 190);
console.log(res);
