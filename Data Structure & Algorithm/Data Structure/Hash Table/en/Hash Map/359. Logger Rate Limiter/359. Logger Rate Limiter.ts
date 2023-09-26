// 359. Logger Rate Limiter

// Design a logger system that receives a stream of messages along with their timestamps. Each unique message should only be printed at most every 10 seconds (i.e. a message printed at timestamp t will prevent other identical messages from being printed until timestamp t + 10).

// All messages will come in chronological order. Several messages may arrive at the same timestamp.

// Implement the Logger class:

// Logger() Initializes the logger object.
// bool shouldPrintMessage(int timestamp, string message) Returns true if the message should be printed in the given timestamp, otherwise returns false.

// Example 1:
// Input
// ["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
// [[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
// Output
// [null, true, true, false, false, false, true]
// Explanation
// Logger logger = new Logger();
// logger.shouldPrintMessage(1, "foo");  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
// logger.shouldPrintMessage(2, "bar");  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
// logger.shouldPrintMessage(3, "foo");  // 3 < 11, return false
// logger.shouldPrintMessage(8, "bar");  // 8 < 12, return false
// logger.shouldPrintMessage(10, "foo"); // 10 < 11, return false
// logger.shouldPrintMessage(11, "foo"); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 +

export class Logger {
  map: Map<string, number>;

  constructor() {
    this.map = new Map<string, number>();
  }

  shouldPrintMessage(timestamp: number, message: string): boolean {
    if (!this.map.has(message)) {
      this.map.set(message, timestamp + 10);
      return true;
    } else {
      const next_time = this.map.get(message)!;
      if (timestamp >= next_time) {
        this.map.set(message, timestamp + 10);
        return true;
      }
      return false;
    }
  }
}

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */

// test
const logger = new Logger();
const res1 = logger.shouldPrintMessage(1, 'foo'); // return true, next allowed timestamp for "foo" is 1 + 10 = 11
const res2 = logger.shouldPrintMessage(2, 'bar'); // return true, next allowed timestamp for "bar" is 2 + 10 = 12
const res3 = logger.shouldPrintMessage(3, 'foo'); // 3 < 11, return false
const res4 = logger.shouldPrintMessage(8, 'bar'); // 8 < 12, return false
const res5 = logger.shouldPrintMessage(10, 'foo'); // 10 < 11, return false
const res6 = logger.shouldPrintMessage(11, 'foo'); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 + 10 = 21

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);
console.log(res6);
