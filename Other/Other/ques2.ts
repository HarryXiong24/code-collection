// Typescript

// intervals format like [[start_time, end_time], [start_time, end_time]]

interface Interval {
  id: number;
  start_time: number;
  end_time: number;
}

export function Search(intervals: Interval[]): number[] {
  const p = new Array(intervals.length).fill(0);

  for (let i = 0; i < intervals.length; i++) {
    let left = 0;
    let right = intervals.length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (intervals[mid].end_time <= intervals[i].start_time) {
        p[i] = intervals[mid].id;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return p;
}

// test
const res = Search([
  {
    id: 1,
    start_time: 1,
    end_time: 3,
  },
  {
    id: 2,
    start_time: 2,
    end_time: 5,
  },
  {
    id: 3,
    start_time: 4,
    end_time: 6,
  },
  {
    id: 4,
    start_time: 7,
    end_time: 8,
  },
  {
    id: 5,
    start_time: 9,
    end_time: 11,
  },
]);
console.log(res);
