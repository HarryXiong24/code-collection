# Slide Window

Here are some key points I summarized for the Slide Window

## Forms

- Fixed-Length
- Variable-Length

## Tricks

### Using two pointers to define a queue

Although the slide window looks more like a queue in a visual that can enqueue the latest value at the end of the queue, and dequeue the oldest value from the head of the queue.

But please remember, in most cases I met, we would be better to use two pointers(start, end) to define slide window instead of using a queue.

The reason is that if questions include removing or avoiding duplications, the queue will find it hard to find the previous value to remove. The time complexity will be at most O(n^2) if we use a queue. But because the start and end pointer is easy to manage duplications(e.g., using a map to store the count of each value) while iterating through the array, it will be easier to solve the problem.

### Using a map/set to store the count of each value to avoid duplications

In most cases, we would use a map to store the count of each value while iterating through the array. This is because it is easy to manage duplications.

For example, if we want to find the longest substring without repeating characters, we can use a map/set to store the count of each character in the substring. If the count of a character is greater than 1, we can remove the character from the substring.

### If it is a fixed-length slide window problem, the indices of the start and end pointers often have a mathematical relation to calculate each other

For example, if we want to find the maximum sum of a subarray of length k, we can use the following formula to calculate the index of the new value:

```
new_value_index = end - k + 1
```

This is because the new value is the value at the end of the window, and the index of the new value is the index of the end of the window minus k plus 1.
