// 1094. Car Pooling

// There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

// You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

// Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.

// Example 1:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 4
// Output: false

// Example 2:
// Input: trips = [[2,1,5],[3,3,7]], capacity = 5
// Output: true

export function carPooling(trips: number[][], capacity: number): boolean {
  const events: number[][] = [];

  for (const [numPassengers, from, to] of trips) {
    events.push([from, -numPassengers]);
    events.push([to, numPassengers]);
  }

  events.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  let restCapacity = capacity;

  for (const [status, numPassengers] of events) {
    restCapacity += numPassengers;

    if (restCapacity < 0) {
      return false;
    }
  }

  return true;
}

// test
const res = carPooling(
  [
    [2, 1, 5],
    [3, 3, 7],
  ],
  4
);
console.log(res);
