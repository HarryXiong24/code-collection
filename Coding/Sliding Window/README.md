# Slide Window Wrapping Up

Here are some key points I summarized for Slide Window

## Forms

- Fixed-Length
- Variable-Length

## Tricks

### Using two pointers to define queue

Although slide window looks more like a queue in visual that can enqueue a latest value into the end of queue, and dequeue the most previous value from the head of the queue.

But please remember, in the most of cases I met, we would better to use two pointers(start, end) to define slide window instead of using queue.

The reason is that if questions includes removing or avoiding duplications, the queue will be hard to find the previous value to remove. The time complexity will be at most O(n^2) if we use queue. But because start and end pointer is easy to manage duplications(e.g. using a map to store the count of each value) while iterating through the array, it will be more easy to solve the problem.

### Using a map/set to store the count of each value to avoid duplications

In the most of cases, we would use a map to store the count of each value while iterating through the array. This is because it is easy to manage duplications.

For example, if we want to find the longest substring without repeating characters, we can use a map/set to store the count of each character in the substring. If the count of a character is greater than 1, we can remove the character from the substring.

### If it is a fixed length slide window problem, the index of start and end pointer often have a math formula to calculate each other

For example, if we want to find the maximum sum of a subarray of length k, we can use the following formula to calculate the index of the new value:

```
new_value_index = end - k + 1
```

This is because the new value is the value at the end of the window, and the index of the new value is the index of the end of the window minus k plus 1.
