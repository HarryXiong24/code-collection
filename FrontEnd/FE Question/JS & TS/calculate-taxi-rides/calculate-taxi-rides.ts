// Calculate Taxi Rides

// Question:
// Given a max distance (in miles) that a taxi can travel. Return a function that takes a start position and end position and returns the cost of each ride.
// Cost of each ride is calculated by, if:
// - Distance traveled <= 5, then each miles costs $100.
// - Distance traveled <= 10 and > 5 then each mile is $150.
// - Distance traveled <= max distance and > 10 then each mile is $200.
// If the start position is different from the previous end position, then add that distance to the current ride.

// Example:
// const taxi = orderTaxi(21);
// console.log(taxi(0,6)); // $900 (5 X $150)
// console.log(taxi(8,10)); // $400 ((10 - 6) * 100)
// console.log(taxi(10,21)); // $2200 (11 x $200)

export const orderTaxi = (distance: number) => {
  let last_distance: number = 0;

  return (start: number, end: number): number => {
    if (start < 0 || end < 0) {
      throw new Error('Invalid');
    }
    if (start > distance || end > distance) {
      throw new Error('Invalid');
    }

    let currDistance = Math.abs(end - start);

    if (last_distance !== start) {
      currDistance += Math.abs(start - last_distance);
    }
    last_distance = end;

    if (currDistance <= 5) {
      return 100 * currDistance;
    } else if (currDistance <= 10) {
      return 150 * currDistance;
    }

    return 200 * currDistance;
  };
};

// test
const taxi = orderTaxi(21);
console.log(taxi(0, 6)); // $900 (5 X $150)
console.log(taxi(8, 10)); // $400 ((10 - 6) * 100)
console.log(taxi(10, 21)); // $2200 (11 x $200)
